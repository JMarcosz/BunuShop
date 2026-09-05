import type { APIRoute } from 'astro';
import { getPortfolioData } from '../lib/storage';
import { aFechaISO } from '../lib/fechas';

export const prerender = false;

const SITE = 'https://bunushop.store';

/**
 * Sitemap generado a partir de los datos reales.
 *
 * El anterior era estático y declaraba fragmentos (/#galeria, /#faq...), que
 * Google consolida en la home: de seis URLs declaradas solo una era real.
 * Generarlo aquí garantiza que cada producto y cada artículo nuevo aparezca
 * sin que nadie tenga que acordarse de editar un XML a mano.
 */
export const GET: APIRoute = async () => {
  const data = await getPortfolioData();

  const productos = (data?.projects || []).filter((p: any) => p && p.status !== 'draft' && p.slug);
  const posts = (data?.blogPosts || []).filter((p: any) => p && p.status !== 'draft' && p.slug);

  const hoy = new Date().toISOString().split('T')[0];

  const entradas = [
    { loc: `${SITE}/`, lastmod: hoy, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE}/sobre-mary-sorelly-eljach`, lastmod: hoy, changefreq: 'monthly', priority: '0.7' },
    // lastmod exige ISO 8601. Las fechas de los artículos son texto de
    // visualización ("MARZO 2024"), así que pasan por aFechaISO y, si no se
    // pueden interpretar, caen a la fecha de hoy en vez de invalidar el XML.
    ...productos.map((p: any) => ({
      loc: `${SITE}/producto/${p.slug}`,
      lastmod: aFechaISO(p.updatedAt) || hoy,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...posts.map((p: any) => ({
      loc: `${SITE}/blog/${p.slug}`,
      lastmod: aFechaISO(p.date) || hoy,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entradas
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
