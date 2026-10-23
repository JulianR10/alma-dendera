import type { APIRoute } from 'astro';

// Sitio de una sola página: un sitemap a mano evita sumar @astrojs/sitemap.
export const GET: APIRoute = ({ site }) => {
  const url = new URL(import.meta.env.BASE_URL, site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}</loc></url>
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
