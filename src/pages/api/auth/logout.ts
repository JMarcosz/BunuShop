import type { APIRoute } from 'astro';
import { COOKIE_NAME } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  // Eliminar la cookie de sesión del navegador
  cookies.delete(COOKIE_NAME, {
    path: '/'
  });

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Sesión finalizada exitosamente.' 
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
