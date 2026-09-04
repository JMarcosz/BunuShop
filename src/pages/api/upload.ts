import type { APIRoute } from 'astro';
import { uploadImage } from '../../lib/storage';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Se requiere Content-Type: multipart/form-data' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'No se ha enviado ningún archivo en el campo "file"' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ error: 'Solo se permiten archivos de imagen (PNG, JPG, WEBP, SVG)' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const url = await uploadImage(file, file.name);

    return new Response(
      JSON.stringify({
        success: true,
        url,
        name: file.name,
        size: file.size,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Error en POST /api/upload:', err);
    return new Response(
      JSON.stringify({ error: 'Error al subir la imagen', details: err?.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
