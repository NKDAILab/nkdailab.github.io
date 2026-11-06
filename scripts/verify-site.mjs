import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const data = JSON.parse(await readFile(resolve(root, 'src/data/site.json'), 'utf8'));
const updates = JSON.parse(await readFile(resolve(root, 'src/data/alumni-updates.json'), 'utf8'));
const issues = [];
const check = (test, message) => { if (!test) issues.push(message); };
const active = data.members.filter(m => m.role !== 'alumni');
const alumni = data.members.filter(m => m.role === 'alumni');

check(data.members.length === 46, 'Expected 40 original and 6 new members');
check(new Set(data.members.map(m => m.id)).size === data.members.length, 'Duplicate member IDs');
check(new Set(data.members.map(m => m.name.zh)).size === data.members.length, 'Duplicate member names');
check(data.publications.length === 13 && data.news.length === 3, 'Original publications or news were lost');
check(active.length === 22 && alumni.length === 24, 'Incorrect current/alumni grouping');
for (const [name, change] of Object.entries(updates)) {
  const member = data.members.find(m => m.name.zh === name);
  check(member?.role === 'alumni' && member?.status === change.status, `${name}: incorrect former-member status`);
  for (const lang of ['zh', 'en']) {
    check(member?.destination[lang] === change.destination[lang], `${name}: missing ${lang} destination`);
    check(!member?.profile[lang].education.filter(e => /南方科技大学|Southern University|SUSTech/.test(e.institution)).some(e => /至今|present/i.test(e.course)), `${name}: lab affiliation still marked present`);
  }
}
for (const name of ['孙杨洋', '练家琪', '吕子轩', '裘成虎', '黄子豪']) {
  const m = active.find(m => m.name.zh === name);
  check(m?.role === 'master' && m?.isNew, `${name}: missing 2026 master's student`);
}
check(active.find(m => m.name.zh === '陈冠霖')?.role === 'undergraduate', '陈冠霖 must remain an undergraduate');
check(alumni.find(m => m.name.zh === '尚阳星')?.status === 'course-completed', 'Do not describe 尚阳星 as having graduated');

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files;
}
const htmlFiles = (await walk(dist)).filter(file => extname(file) === '.html');
const html = new Map(await Promise.all(htmlFiles.map(async file => [file, await readFile(file, 'utf8')])));
const exists = async file => { try { return (await stat(file)).isFile(); } catch { return false; } };
for (const [file, source] of html) {
  const page = relative(dist, file);
  if (!source.includes('http-equiv="refresh"')) {
    check(!/Michael Brown|Emily Chen|Sarah Johnson|University Name|contact@lab\.edu|We are the Scholar-Lite Lab|个人照片一张|11、毕业去向|全国.*例子/.test(source), `${page}: template/example content`);
  }
  const base = new URL(page.replace(/index\.html$/, ''), 'https://nkdailab.github.io/');
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    let url;
    try { url = new URL(raw, base); }
    catch { check(false, `${page}: invalid URL ${raw}`); continue; }
    if (url.hostname !== 'nkdailab.github.io') continue;
    let target = resolve(dist, '.' + decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = resolve(target, 'index.html');
    check(target.startsWith(dist) && await exists(target), `${page}: broken local URL ${raw}`);
    if (url.hash && html.has(target)) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      const body = html.get(target);
      check(body.includes(`id="${fragment}"`) || body.includes('http-equiv="refresh"'), `${page}: missing anchor ${raw}`);
    }
  }
}
for (const lang of ['zh', 'en']) {
  const prefix = lang === 'en' ? 'en/' : '';
  const people = html.get(resolve(dist, prefix + 'team/index.html')) || '';
  const alumniSection = people.match(/<section\b[^>]*id="alumni"[^>]*>([\s\S]*?)<\/section>/)?.[1] || '';
  check(people.includes(`lang="${lang === 'zh' ? 'zh-CN' : 'en'}"`), `${lang}: incorrect HTML language`);
  for (const m of data.members) {
    const profile = html.get(resolve(dist, prefix + 'team/' + m.id + '/index.html'));
    check(profile?.includes(m.email), `${lang}: missing profile/contact for ${m.name.zh}`);
    if (m.role === 'alumni' && m.destination[lang]) {
      const escaped = m.destination[lang].replaceAll('&', '&amp;').replaceAll("'", '&#39;');
      check(people.includes(m.destination[lang]) || people.includes(escaped), `${lang}: missing alumni destination for ${m.name.zh}`);
    }
    if (m.role === 'alumni') {
      check(alumniSection.includes(`data-member-id="${m.id}"`), `${lang}: missing alumni card for ${m.name.zh}`);
      const href = `href="/${prefix}team/${m.id}/"`;
      check(alumniSection.split(href).length >= 3, `${lang}: alumni photo and name must both link to ${m.name.zh}'s profile`);
    }
  }
  for (const path of ['publications/index.html', 'achievements/index.html', ...data.publications.map(p => 'publications/' + p.id + '/index.html')]) {
    const source = html.get(resolve(dist, prefix + path)) || '';
    for (const link of source.matchAll(/<a\b[^>]*data-publication-link="(citation|video)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const caption = link[2].replace(/<[^>]*>/g, '').trim();
      const expected = lang === 'en' ? { citation: 'Cite', video: 'Video' } : { citation: '引用', video: '视频' };
      check(caption === expected[link[1]], `${prefix}${path}: wrong ${link[1]} language: ${caption}`);
    }
  }
}
const origin = JSON.parse(await readFile(resolve(root, 'src/data/template-origin.json'), 'utf8'));
const originalStyles = origin.files.find(f => f.destination === 'src/styles/global.css');
check(createHash('sha256').update(await readFile(resolve(root, 'src/styles/global.css'))).digest('hex') === originalStyles.originalSha256, 'Original Scholar-Lite global styles were not retained');
for (const paper of data.publications.filter(p => p.links.some(l => l.label === '引用'))) {
  const citation = resolve(dist, 'citations/' + paper.id + '.bib');
  check(await exists(citation), `Missing original BibTeX: ${paper.id}`);
  if (await exists(citation)) check(/@\w+\s*\{/.test(await readFile(citation, 'utf8')), `Invalid BibTeX download: ${paper.id}`);
}
check(await exists(resolve(dist, 'pagefind/pagefind.js')), 'Missing Pagefind search index');
check(await exists(resolve(dist, 'pagefind/pagefind-ui.js')), 'Missing Pagefind search UI');
for (const [name, change] of Object.entries(updates)) {
  for (const prefix of ['', 'en/', 'zh/']) {
    const feedPath = resolve(dist, prefix + 'author/' + name + '/index.xml');
    check(await exists(feedPath), `${prefix}${name}: missing author RSS`);
    if (await exists(feedPath)) {
      const feed = await readFile(feedPath, 'utf8');
      const expected = change.destination[prefix === 'en/' ? 'en' : 'zh'].replaceAll('&', '&amp;').replaceAll("'", '&apos;');
      check(feed.includes(expected), `${prefix}${name}: stale author RSS destination`);
    }
  }
}
check(await exists(resolve(dist, 'en/author/dong-liu/index.xml')), 'Missing legacy coauthor RSS');
if (issues.length) { issues.forEach(issue => console.error('FAIL:', issue)); process.exit(1); }
console.log(`Verified ${htmlFiles.length} HTML pages, 46 members, all 24 clickable alumni cards, bilingual citation/video labels, original BibTeX downloads, original template styles, local links/assets, search output, and legacy RSS destinations.`);
