import { pageRoutes } from '../lib/site';
import { SITE } from '../config';
export function GET() {
  const routes = pageRoutes().filter(p => p.kind !== 'redirect' && p.kind !== 'coauthor');
  const urls = routes.map(p => `<url><loc>${new URL('/' + (p.route ? p.route + '/' : ''), SITE.website)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
