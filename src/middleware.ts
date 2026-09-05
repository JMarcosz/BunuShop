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

const DOMINIO_CANONICO = 'bunushop.store';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies, redirect } = context;
  const pathname = url.pathname;

  // 0. Canonicalización de dominio.
  //
  // El deployment de Vercel sirve una copia íntegra y rastreable de la tienda.
  // Se resuelve con un 308 permanente, no con noindex: Google desaconseja
  // usar noindex para desduplicar URLs que ya agrupó como la misma página,
  // porque puede aplicar esa directiva al grupo canónico entero y terminar
  // desindexando también el dominio bueno. El redirect consolida las señales
  // en bunushop.store sin ese riesgo.
  if (url.hostname.endsWith('.vercel.app')) {
    return Response.redirect(`https://${DOMINIO_CANONICO}${pathname}${url.search}`, 308);
  }
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
