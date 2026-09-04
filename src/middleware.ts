import { defineMiddleware } from 'astro:middleware';
import { COOKIE_NAME, verifySessionToken } from './lib/auth';

function applySecurityHeaders(res: Response, sensitive = false): Response {
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (sensitive) {
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
  }
  return res;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies, redirect } = context;
  const pathname = url.pathname;
  const isApi = pathname.startsWith('/api/');
  const isAdmin = pathname.startsWith('/admin');

  // 1. Extraer y verificar token de sesión desde la cookie segura
  const sessionCookie = cookies.get(COOKIE_NAME);
  const session = verifySessionToken(sessionCookie?.value);

  // 2. Control de Acceso a Rutas Administrativas (/admin)
  if (isAdmin) {
    const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

    if (isLoginPage) {
      // Si ya está autenticado, redirigir directo al dashboard
      if (session) {
        return applySecurityHeaders(redirect('/admin'), true);
      }
      // Permitir acceso a la pantalla de login
    } else {
      // Cualquier otra ruta administrativa requiere sesión válida
      if (!session) {
        return applySecurityHeaders(redirect('/admin/login'), true);
      }
      // Guardar información del usuario autenticado en locals
      context.locals.user = session;
    }
  }

  // 3. Control de Acceso a Endpoints de API Mutantes (POST /api/portafolio, POST /api/upload)
  if (isApi) {
    const isAuthEndpoint = pathname.startsWith('/api/auth/');
    const isMutatingMethod = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);

    // Protegemos APIs de modificación que no sean las de autenticación
    if (!isAuthEndpoint && isMutatingMethod) {
      if (!session) {
        return applySecurityHeaders(
          new Response(
            JSON.stringify({ 
              success: false, 
              error: 'No autorizado. Se requiere inicio de sesión administrativo.' 
            }),
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ),
          true
        );
      }
    }
  }

  // Ejecutar el siguiente manejador / página
  const response = await next();

  // 4. Inyección de Cabeceras de Seguridad HTTP (Defense in Depth)
  return applySecurityHeaders(response, isAdmin || isApi);
});
