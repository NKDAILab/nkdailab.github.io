import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { members, publications, news, localPath, statusLabel, type Lang } from '../lib/site';

export function getStaticPaths() {
  const paths: { params: { feed: string }; props: { lang: Lang; memberId?: string; authorName?: string; section: string } }[] = [];
  for (const lang of ['zh', 'en'] as const) {
    for (const prefix of lang === 'zh' ? ['', 'zh/'] : ['en/']) {
      for (const section of ['', 'post/', 'publication/']) paths.push({ params: { feed: prefix + section + 'index' }, props: { lang, section } });
      for (const m of members) {
        for (const name of new Set([m.name.zh, m.id])) paths.push({ params: { feed: prefix + 'author/' + name + '/index' }, props: { lang, memberId: m.id, section: 'author' } });
      }
      const coauthors = new Map(publications.flatMap(p => p.authorSlugs.map((slug, i) => [slug, p.authors[i]] as const)));
      for (const [slug, name] of coauthors) {
        if (!members.some(m => m.id === slug)) paths.push({ params: { feed: prefix + 'author/' + slug + '/index' }, props: { lang, authorName: name, section: 'author' } });
      }
    }
  }
  return paths;
}

const xml = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
export const GET: APIRoute = ({ props }) => {
  const { lang, memberId, authorName, section } = props as { lang: Lang; memberId?: string; authorName?: string; section: string };
  const member = members.find(m => m.id === memberId);
  const url = (path: string) => new URL(localPath(lang, path), SITE.website).href;
  const item = (title: string, path: string, description: string, date?: string) => `<item><title>${xml(title)}</title><link>${xml(url(path))}</link><guid isPermaLink="true">${xml(url(path))}</guid><description>${xml(description)}</description>${date ? `<pubDate>${new Date(date + 'T12:00:00Z').toUTCString()}</pubDate>` : ''}</item>`;
  const profile = member ? item(member.name[lang], 'team/' + member.id, statusLabel(member.status, lang) + ' · ' + member.profile[lang].bio + (member.destination[lang] ? ' · ' + member.destination[lang] : '')) : '';
  const author = authorName || member?.name.en.replace('Prof. ', '');
  const papers = section === 'post/' ? '' : publications.filter(p => !author || p.authors.includes(author)).map(p => item(p.title, 'publications/' + p.id, p.abstract, p.date)).join('');
  const posts = section === 'author' || section === 'publication/' ? '' : news.map(n => item(n.content[lang].title, 'news/' + n.id, n.content[lang].summary, n.date)).join('');
  const title = member ? member.name[lang] + ' | ' + SITE.shortName : authorName ? authorName + ' | ' + SITE.shortName : SITE.name[lang];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(title)}</title><link>${xml(url(''))}</link><description>${xml(SITE.description[lang])}</description><language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>${profile}${papers}${posts}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
