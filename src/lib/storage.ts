import { put, list } from '@vercel/blob';
import fs from 'node:fs/promises';
import path from 'node:path';
import defaultData from '../data/portafolio.json';

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
 * 1. Intenta leer desde Vercel Blob si el token está presente.
 * 2. Si no o si Vercel Blob no tiene aún datos, intenta leer del disco local (desarrollo).
 * 3. En entorno Serverless (Vercel) donde el disco es efímero/restringido, recurre de forma 100% segura
 *    a los datos base embebidos en memoria sin provocar excepciones no controladas.
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
      } else {
        // El token existe pero aún no se ha creado el archivo en Vercel Blob.
        // Lo inicializamos automáticamente con los datos oficiales de Bunu Shop.
        try {
          await put('datos/portafolio.json', JSON.stringify(defaultData, null, 2), {
            access: 'public',
            addRandomSuffix: false,
          });
        } catch (initErr) {
          console.warn('Advertencia al auto-inicializar Vercel Blob:', initErr);
        }
      }
    } catch (err) {
      console.warn('Advertencia al consultar Vercel Blob, usando datos de respaldo:', err);
    }
  }

  // Fallback 1: Intentar leer del archivo local (funciona en desarrollo local)
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, 'utf-8');
    return JSON.parse(raw) as PortfolioData;
  } catch {
    // Fallback 2: En producción serverless (donde la carpeta src/ no existe en el contenedor)
    // retornamos directamente el JSON embebido y compilado en memoria.
    return defaultData as unknown as PortfolioData;
  }
}

/**
 * Guarda los datos del portafolio.
 * En producción guarda físicamente en Vercel Blob: datos/portafolio.json.
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

      // Intentamos sincronizar con el disco local si el filesystem es editable
      try {
        await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
      } catch {}

      return { url: blob.url, storage: 'blob' };
    } catch (err) {
      console.error('Error al guardar en Vercel Blob:', err);
      try {
        await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
        return { url: '/data/portafolio.json', storage: 'local' };
      } catch {
        throw new Error('Error al guardar en Vercel Blob. Por favor verifica los permisos del token.');
      }
    }
  } else {
    // Modo local
    try {
      await fs.writeFile(LOCAL_DATA_PATH, jsonData, 'utf-8');
      return { url: '/data/portafolio.json', storage: 'local' };
    } catch (err) {
      console.warn('Aviso: Sistema de archivos local no editable (entorno serverless sin token de Vercel Blob):', err);
      return { url: '#', storage: 'local' };
    }
  }
}

/**
 * Sube una imagen a Vercel Blob (o a public/uploads/ en modo local)
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
    try {
      await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(LOCAL_UPLOADS_DIR, cleanName);
      await fs.writeFile(filePath, buffer);
      return `/uploads/${cleanName}`;
    } catch (err) {
      console.warn('No se pudo guardar en disco local (entorno serverless), usando base64 data URL:', err);
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = (file as any).type || 'image/jpeg';
      return `data:${mimeType};base64,${buffer.toString('base64')}`;
    }
  }
}
