import { put, list } from '@vercel/blob';
import fs from 'node:fs/promises';
import path from 'node:path';

const LOCAL_DATA_PATH = path.resolve(process.cwd(), 'src/data/portafolio.json');
const LOCAL_UPLOADS_DIR = path.resolve(process.cwd(), 'public/uploads');

export interface PortfolioData {
  siteInfo: any;
  metrics: any;
  featuredProduct: any;
  services: any[];
  workflowPhases: any[];
  projects: any[];
  blogPosts: any[];
}

/**
 * Carga los datos del portafolio.
 * Intenta leer desde Vercel Blob si el token está presente.
 * Si no o en caso de error/desarrollo local, recurre al archivo JSON local.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (hasToken) {
    try {
      const { blobs } = await list({ prefix: 'datos/portafolio.json' });
      const mainBlob = blobs.find((b) => b.pathname === 'datos/portafolio.json') || blobs[0];

      if (mainBlob) {
        // Usamos cache busting para asegurar la versión más reciente
        const res = await fetch(`${mainBlob.url}?t=${Date.now()}`);
        if (res.ok) {
          return (await res.json()) as PortfolioData;
        }
      }
    } catch (err) {
      console.warn('Advertencia al consultar Vercel Blob, usando fallback local:', err);
    }
  }

  // Fallback local
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, 'utf-8');
    return JSON.parse(raw) as PortfolioData;
  } catch (err) {
    console.error('Error al leer datos locales:', err);
    throw err;
  }
}

/**
 * Guarda los datos del portafolio.
 * En producción (o si existe el token) guarda físicamente en Vercel Blob: datos/portafolio.json
 * En desarrollo local guarda en src/data/portafolio.json.
 */
export async function savePortfolioData(jsonData: string): Promise<{ url: string; storage: 'blob' | 'local' }> {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (hasToken) {
    try {
      const blob = await put('datos/portafolio.json', jsonData, {
        access: 'public',
        addRandomSuffix: false,
      });

      // También intentamos mantener sincronizado el archivo local si estamos en filesystem accesible
      try {
        await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
      } catch {}

      return { url: blob.url, storage: 'blob' };
    } catch (err) {
      console.error('Error al guardar en Vercel Blob:', err);
      // Si falla Vercel Blob pero podemos escribir local, lo intentamos
      await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
      return { url: '/data/portafolio.json', storage: 'local' };
    }
  } else {
    // Modo local
    await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
    return { url: '/data/portafolio.json', storage: 'local' };
  }
}

/**
 * Sube una imagen a Vercel Blob (o a public/uploads/ si está en modo local)
 */
export async function uploadImage(file: File | Blob, filename: string): Promise<string> {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const cleanName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  if (hasToken) {
    const blob = await put(`imagenes/${cleanName}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    return blob.url;
  } else {
    // Guardar en public/uploads/
    await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(LOCAL_UPLOADS_DIR, cleanName);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${cleanName}`;
  }
}
