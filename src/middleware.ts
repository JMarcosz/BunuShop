import { defineMiddleware } from 'astro:middleware';
import { COOKIE_NAME, verifySessionToken } from './lib/auth';

function applySecurityHeaders(res: Response, sensitive = false): Response {
  try {
    res.headers.set('X-Frame-Options', 'SAMEORIGIN');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    if (sensitive) {
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.headers.set('Pragma', 'no-cache');
    }
    return res;
  } catch {
    // Si la respuesta tiene cabeceras inmutables (ej. Response.redirect en Web API estándar),
    // creamos una nueva Response clonando el body y mutando una nueva instancia de Headers.
    const newHeaders = new Headers(res.headers);
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (sensitive) {
      newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      newHeaders.set('Pragma', 'no-cache');
    }
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  }
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
  const finalResponse = applySecurityHeaders(response, isAdmin || isApi);

  // 5. Canonicalización de dominio.
  // El deployment de Vercel (bunu-shop.vercel.app) sirve una copia íntegra de
  // la tienda y es rastreable, lo que divide las señales con el dominio real.
  // La inspección de URL de Search Console llegó a registrar ese host como
  // canónico declarado. Marcamos noindex en cualquier host *.vercel.app para
  // que solo bunushop.store compita en los resultados.
  if (url.hostname.endsWith('.vercel.app')) {
    try {
      finalResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
    } catch {
      // Cabeceras inmutables: no bloqueamos la respuesta por esto.
    }
  }

  return finalResponse;
});
