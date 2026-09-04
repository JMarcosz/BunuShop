import type { APIRoute } from 'astro';
import { getPortfolioData, savePortfolioData } from '../../lib/storage';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const data = await getPortfolioData();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Error al obtener datos del portafolio', details: err?.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const jsonData = await request.text();

    if (!jsonData) {
      return new Response(JSON.stringify({ error: 'El contenido JSON no puede estar vacío' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validamos que sea JSON válido
    try {
      JSON.parse(jsonData);
    } catch {
      return new Response(JSON.stringify({ error: 'Formato JSON inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Guarda en Vercel Blob (o fallback local si no hay token)
    const result = await savePortfolioData(jsonData);

    return new Response(
      JSON.stringify({
        success: true,
        url: result.url,
        storage: result.storage,
        message:
          result.storage === 'blob'
            ? 'Datos sincronizados exitosamente en Vercel Blob.'
            : 'Datos guardados localmente (configura BLOB_READ_WRITE_TOKEN en Vercel para sincronización en la nube).',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Error en POST /api/portafolio:', err);
    return new Response(
      JSON.stringify({ error: 'Error al guardar datos del portafolio', details: err?.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
