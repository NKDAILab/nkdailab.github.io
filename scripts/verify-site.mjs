import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const data = JSON.parse(await readFile(resolve(root, 'src/data/site.json'), 'utf8'));
const updates = JSON.parse(await readFile(resolve(root, 'src/data/alumni-updates.json'), 'utf8'));
const publicationReview = JSON.parse(await readFile(resolve(root, 'docs/publication-review.json'), 'utf8'));
const materialsReview = JSON.parse(await readFile(resolve(root, 'docs/materials-update-review.json'), 'utf8'));
const issues = [];
const check = (test, message) => { if (!test) issues.push(message); };
const active = data.members.filter(m => m.role !== 'alumni');
const alumni = data.members.filter(m => m.role === 'alumni');

check(data.members.length === 47, 'Expected the 47 members with supplied profiles');
check(new Set(data.members.map(m => m.id)).size === data.members.length, 'Duplicate member IDs');
check(new Set(data.members.map(m => m.name.zh)).size === data.members.length, 'Duplicate member names');
check(data.news.length === 3, 'Original news articles were lost');
check(new Set(data.publications.map(p => p.id)).size === data.publications.length, 'Duplicate publication IDs');
for (const id of publicationReview.originalPublicationIds) check(data.publications.some(p => p.id === id), `Original publication lost: ${id}`);
for (const paper of publicationReview.papers) {
  const entry = data.publications.find(p => p.id === paper.paperId);
  check(!!entry, `Reviewed publication missing: ${paper.title}`);
  const sources = entry?.links.filter(l => ['Paper', 'arXiv', 'DOI'].includes(l.label)) || [];
  check(sources.length === 1, `Expected one preferred paper source: ${paper.title}`);
  check(sources[0]?.url === paper.preferredSource?.url, `Preferred source differs from reviewed conference/publisher → arXiv → other selection: ${paper.title}`);
}
check(publicationReview.papers.filter(p => p.sourceCitation).length + publicationReview.supersededSourceListEntries.length === publicationReview.sourceListCount, 'Original list entries must be retained or explicitly superseded by the new archive');
for (const paper of materialsReview.paperReview.files.filter(p => p.type !== 'supplementary')) {
  check(data.publications.some(p => p.id === paper.paperId), `Archive paper missing: ${paper.filename}`);
}
check(data.publications.length === 42, 'Expected 42 publications after the archive correction');
check(!data.publications.some(p => p.id.startsWith('open-world-test-time')), 'Do not retain the superseded IJCNN entry as a published paper');
const rasa = data.publications.find(p => p.id.startsWith('rasa-'));
check(rasa?.authors.length === 5 && rasa.links[0].url.includes('11729341'), 'RASA must use its own authors and official source, not the older arXiv record');
for (const paper of data.publications) {
  for (const link of paper.links.filter(l => l.url.startsWith('http'))) {
    const url = new URL(link.url);
    check(![...url.searchParams.keys()].some(key => /^(utm_|fbclid$|gclid$|dclid$|msclkid$|mc_cid$|mc_eid$|igshid$|_ga$|_gl$|spm$|si$|feature$|ref$|referrer$|via$)/i.test(key)), `Tracking parameter in ${paper.title}: ${link.url}`);
  }
}
check(active.length === 23 && alumni.length === 24, 'Incorrect current/alumni grouping');
check(active.find(m => m.id === 'zihao-zhou')?.name.zh === '周子皓', '周子皓 must not be renamed to 周子善');
const certificatePatents = materialsReview.patentReview.patents.filter(p => p.source.sheet === 'NKD' && p.certificate);
check(data.patents.length === certificatePatents.length, 'Expected only NKD patents with supplied certificates');
for (const patent of data.patents) {
  const original = certificatePatents.find(p => p.id === patent.id);
  check(!!original && patent.source.sheet === 'NKD' && !!patent.certificateUrl, `Patent outside the requested source/certificate scope: ${patent.id}`);
  check(patent.status === original?.sourceStatus, `Patent status must match the spreadsheet verbatim: ${patent.id}`);
}
for (const [name, change] of Object.entries(updates)) {
  const member = data.members.find(m => m.name.zh === name);
  check(member?.role === 'alumni' && member?.status === change.status, `${name}: incorrect former-member status`);
  for (const lang of ['zh', 'en']) {
    check(member?.destination[lang] === change.destination[lang], `${name}: missing ${lang} destination`);
    check(!member?.profile[lang].education.filter(e => /南方科技大学|Southern University|SUSTech/.test(e.institution)).some(e => /至今|present/i.test(e.course)), `${name}: lab affiliation still marked present`);
  }
}
for (const name of ['孙杨洋', '练家琪', '吕子轩', '裘成虎', '黄子豪', '周子善']) {
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
    for (const link of source.matchAll(/<a\b[^>]*data-publication-link="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      check(['citation', 'website', 'pdf', 'arxiv', 'doi'].includes(link[1]), `${prefix}${path}: non-paper-source link displayed: ${link[1]}`);
      const caption = link[2].replace(/<[^>]*>/g, '').trim();
      const expected = lang === 'en' ? { citation: 'Cite', website: 'Paper source', pdf: 'PDF', arxiv: 'arXiv', doi: 'DOI' } : { citation: '引用', website: '论文来源', pdf: 'PDF', arxiv: 'arXiv', doi: 'DOI' };
      check(caption === expected[link[1]], `${prefix}${path}: wrong ${link[1]} language: ${caption}`);
    }
  }
  const achievements = html.get(resolve(dist, prefix + 'achievements/index.html')) || '';
  for (const patent of data.patents) {
    check(achievements.includes(`data-patent-id="${patent.id}"`) && achievements.includes(`data-patent-status="${patent.status}"`), `${lang}: missing patent or incorrect status: ${patent.id}`);
    check(achievements.includes(patent.title[lang]), `${lang}: missing patent title: ${patent.id}`);
  }
  check((achievements.match(/data-patent-certificate/g) || []).length === 12, `${lang}: expected twelve actual certificate links`);
  const faculty = html.get(resolve(dist, prefix + 'team/zhihai-he/index.html')) || '';
  check(faculty.includes('data-faculty-titles') && faculty.includes('62331014') && faculty.includes('12426312'), `${lang}: incomplete faculty update`);
  check(!/id="招聘信息"|id="open-positions"/.test(faculty), `${lang}: recruitment should be on Join Us`);
  check(faculty.includes('href="https://outlook.office.com/mail/deeplink/compose?to=hezh%40sustech.edu.cn"'), `${lang}: missing faculty Outlook email link`);
  const gallery = html.get(resolve(dist, prefix + 'gallery/index.html')) || '';
  check(gallery.includes('data-gallery-photo="lab-group"'), `${lang}: real lab group photo missing`);
}
for (const patent of certificatePatents) {
  const current = data.patents.find(p => p.id === patent.id);
  const path = resolve(dist, '.' + current.certificateUrl);
  check(await exists(path), `Certificate missing: ${patent.id}`);
  if (await exists(path)) {
    const file = await readFile(path);
    check(file.subarray(0, 5).toString() === '%PDF-', `Certificate is not a PDF: ${patent.id}`);
    check(createHash('sha256').update(file).digest('hex') === patent.certificate.sha256, `Certificate differs from supplied source: ${patent.id}`);
  }
}
check(!await exists(resolve(dist, 'docs/materials-update-review.json')), 'Internal review must not be published');
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
console.log(`Verified ${htmlFiles.length} HTML pages, ${data.publications.length} archive-reviewed publications, ${data.members.length} members, all 24 clickable alumni cards, ${data.patents.length} NKD patents with original spreadsheet statuses and certificates, paper-source-only links without tracking, original BibTeX/template styles, local assets, search, and RSS.`);
