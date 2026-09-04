import type { APIRoute } from 'astro';
import { 
  checkRateLimit, 
  recordFailedAttempt, 
  resetRateLimit, 
  verifyCredentials, 
  createSessionToken, 
  COOKIE_NAME, 
  getSessionCookieOptions 
} from '../../../lib/auth';

export const prerender = false;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const ip = getClientIp(request);

  // 1. Verificación de Rate Limiting (Protección contra Fuerza Bruta)
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Demasiados intentos fallidos. Por seguridad, espera ${rateLimit.retryAfter} segundos antes de intentar nuevamente.` 
      }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.retryAfter),
          'Cache-Control': 'no-store'
        } 
      }
    );
  }

  // 2. Extracción y validación del cuerpo de la petición
  let email = '';
  let password = '';

  try {
    const body = await request.json();
    email = String(body.email || '').trim();
    password = String(body.password || '');
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Formato de petición inválido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, error: 'Por favor ingresa correo y contraseña.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Verificación de credenciales con tiempo constante
  const isValid = verifyCredentials(email, password);

  if (!isValid) {
    recordFailedAttempt(ip);
    // Mensaje neutral para prevenir enumeración de cuentas (OWASP Standard)
    return new Response(
      JSON.stringify({ success: false, error: 'Credenciales incorrectas.' }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        } 
      }
    );
  }

  // 4. Éxito: Restablecer contador de intentos y emitir token firmado
  resetRateLimit(ip);
  const token = createSessionToken(email);

  // Configurar cookie de sesión con banderas de seguridad HttpOnly, SameSite y Secure en producción
  cookies.set(
    COOKIE_NAME, 
    token, 
    getSessionCookieOptions(import.meta.env.PROD)
  );

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Sesión iniciada correctamente.' 
    }),
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      } 
    }
  );
};
