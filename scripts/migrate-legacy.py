"""One-time import of the retained Hugo output and the supplied Word profiles.

Requires beautifulsoup4. Run from the repository root; see README.md.
The normal Astro build reads src/data/site.json and does not run this importer.
"""
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from zipfile import ZipFile
from html import escape
import json
import re
import shutil
import unicodedata

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
INFO = ROOT.parent / 'info'
DATA = ROOT / 'src/data'
PUBLIC = ROOT / 'public'
DATA.mkdir(parents=True, exist_ok=True)


def load(path):
    return BeautifulSoup(path.read_text(), 'html.parser')


def text(node):
    return node.get_text(' ', strip=True) if node else ''


def slug(name):
    name = re.sub(r'^Prof\.\s*', '', name)
    return re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()).strip('-')


def local_asset(url, page):
    parsed = urlparse(urljoin('https://nkdailab.github.io/' + page, url))
    if parsed.netloc != 'nkdailab.github.io':
        return url
    path = unquote(parsed.path).lstrip('/')
    source = ROOT / path
    if source.is_file() and source.suffix.lower() not in ['.html', '.xml']:
        dest = PUBLIC / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
    return parsed.path + ('#' + parsed.fragment if parsed.fragment else '')


def clean_html(node, page):
    if not node:
        return ''
    node = BeautifulSoup(str(node), 'html.parser')
    for el in node(['script', 'style', 'iframe']):
        el.decompose()
    for el in node.find_all(True):
        for key in list(el.attrs):
            if key.startswith('on') or key in ['style', 'width', 'height']:
                del el[key]
        if el.name == 'img' and el.get('src'):
            el['src'] = local_asset(el['src'], page)
            el['loading'] = 'lazy'
            el['alt'] = el.get('alt') or ''
        if el.name == 'a' and el.get('href'):
            href = el['href']
            if href.lower().startswith(('javascript:', 'data:')):
                del el['href']
            elif not href.startswith(('#', 'mailto:', 'tel:')):
                el['href'] = local_asset(href, page)
            if el.get('target') == '_blank':
                el['rel'] = 'noopener noreferrer'
    outer = node.find()
    return outer.decode_contents() if outer else ''


roles = {'教师': 'faculty', '博士后': 'postdoc', '博士在读': 'phd', '硕士在读': 'master',
         '本科在读': 'undergraduate', '访问学生': 'visitor', '毕业学生': 'alumni'}
updates = json.loads((DATA / 'alumni-updates.json').read_text())
incoming = json.loads((DATA / 'incoming-members.json').read_text())
members = []
people = load(ROOT / 'people/index.html')
current_role = None
for el in people.select('h2, .people-person'):
    if 'people-person' not in el.get('class', []):
        current_role = roles.get(text(el), current_role)
        continue
    name = text(el.select_one('h2'))
    name_en = text(el.select_one('h3 b'))
    record = {'id': slug(name_en), 'name': {'zh': name, 'en': name_en.replace('Prof. ', '')},
              'role': current_role, 'previousRole': '', 'status': 'active', 'destination': {'zh': '', 'en': ''},
              'email': '', 'links': [], 'avatar': '', 'profile': {}, 'isNew': False}
    for lang, prefix in [('zh', ''), ('en', 'en/')]:
        path = f'{prefix}author/{name}/index.html'
        s = load(ROOT / path)
        article = s.select_one('.article-style')
        body = clean_html(article, path)
        bio = text(article.find('p')) if article else ''
        education = [{'course': text(li.select_one('.course')), 'institution': text(li.select_one('.institution'))}
                     for li in s.select('.ul-edu li')]
        interests = [text(li) for li in s.select('.ul-interests li')]
        if not interests and article:
            heading = next((h for h in article.find_all(['h2', 'h3', 'h4']) if text(h).lower() in ['研究方向', 'research interests', 'research interest']), None)
            following = heading.find_next_sibling() if heading else None
            if following and following.name == 'ul':
                interests = [text(li) for li in following.find_all('li')]
        record['profile'][lang] = {'bio': bio, 'html': body, 'education': education, 'interests': interests}
        if lang == 'zh':
            photo = s.select_one('img.avatar')
            record['avatar'] = local_asset(photo['src'], path) if photo else ''
            mail = s.select_one('a[href^="mailto:"]')
            record['email'] = mail['href'].removeprefix('mailto:') if mail else ''
            record['links'] = [{'label': a.get('aria-label') or ('Google Scholar' if 'scholar.google' in a['href'] else 'Website'),
                                'url': a['href']} for a in s.select('.network-icon a[href]') if a['href'].startswith('https://')]
        if current_role == 'alumni' and article:
            heading = next((h for h in article.find_all(['h2', 'h3', 'h4'])
                            if text(h).lower() in ['毕业去向', 'destination', 'graduation destination', 'career destination', 'future destination', 'placement']), None)
            if heading:
                following = heading.find_next_sibling()
                record['destination'][lang] = text(following)
    if current_role == 'alumni':
        record['status'] = 'graduated'
        edu = [e for e in record['profile']['zh']['education'] if '南方科技大学' in e['institution']]
        record['previousRole'] = ('visitor' if edu and '访问' in edu[0]['course'] else
                                  'phd' if edu and '博士' in edu[0]['course'] else
                                  'master' if edu and '硕士' in edu[0]['course'] else
                                  'undergraduate' if edu and '学士' in edu[0]['course'] else '')
        for lang in ['zh', 'en']:
            for e in record['profile'][lang]['education']:
                if e['institution'].startswith(('南方科技大学', 'Southern University', 'SUSTech')):
                    e['course'] = re.sub(r'(\d{4})\s*[-–—]\s*(?:至今|今|[Pp]resent|[Nn]ow)',
                        lambda m: f'{m[1]} 起（已毕业 / 离组）' if lang == 'zh' else f'From {m[1]} (completed / former member)', e['course'])
    if name in updates:
        change = updates[name]
        record.update(role='alumni', previousRole=current_role, status=change['status'], destination=change['destination'])
        for lang in ['zh', 'en']:
            profile = record['profile'][lang]
            parsed = BeautifulSoup(profile['html'], 'html.parser')
            first = parsed.find('p')
            if first:
                first.string = change['bio'][lang]
            profile['bio'] = change['bio'][lang]
            profile['html'] = str(parsed)
            for edu in profile['education']:
                # A completion year was not supplied. Do not invent one.
                if edu['institution'].startswith(('南方科技大学', 'Southern University', 'SUSTech', 'Central South', '中南大学')):
                    edu['course'] = re.sub(r'(\d{4})\s*[-–—]\s*(?:至今|今|[Pp]resent|[Nn]ow)',
                        lambda m: f"{m[1]} 起（{change['statusLabel']['zh']}）" if lang == 'zh' else f"From {m[1]} ({change['statusLabel']['en']})", edu['course'])
    members.append(record)

for item in incoming:
    name = item['name']['zh']
    record = dict(item)
    record.update(status='active', previousRole='', destination={'zh': '', 'en': ''}, isNew=True)
    doc = next(INFO.glob('*' + name + '*.docx'))
    with ZipFile(doc) as z:
        photos = [p for p in z.namelist() if p.startswith('word/media/') and not p.endswith('/')]
        assert len(photos) == 1, f'Check the profile photos in {doc.name}'
        dest = PUBLIC / 'images/team' / (item['id'] + Path(photos[0]).suffix)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(z.read(photos[0]))
        record['avatar'] = '/' + str(dest.relative_to(PUBLIC))
    for lang in ['zh', 'en']:
        p = record['profile'][lang]
        p['html'] = '<p>' + escape(p['bio']) + '</p>'
        if p.get('honors'):
            p['html'] += '<h2>' + ('个人荣誉' if lang == 'zh' else 'Honors') + '</h2><ul>' + ''.join('<li>' + escape(h) + '</li>' for h in p['honors']) + '</ul>'
    members.append(record)

publications = []
for path in sorted((ROOT / 'publication').glob('*/index.html')):
    s = load(path)
    pub = s.select_one('.pub')
    if not pub:
        continue
    ld = json.loads(s.find('script', type='application/ld+json').string)
    venue = ''
    for heading in pub.select('.pub-row-heading'):
        if text(heading) in ['出版物', 'Publication']:
            venue = text(heading.find_next_sibling())
    publications.append({'id': path.parent.name, 'title': text(pub.h1),
                         'authors': [text(a) for a in pub.select('.article-metadata a')],
                         'authorSlugs': [unquote(a['href']).rstrip('/').split('/')[-1] for a in pub.select('.article-metadata a')],
                         'year': int(ld['datePublished'][:4]), 'date': ld['datePublished'][:10], 'venue': venue,
                         'abstract': text(pub.select_one('.pub-abstract')),
                         'links': [{'label': text(a), 'url': local_asset(a['href'], str(path.relative_to(ROOT)))} for a in pub.select('.btn-links a[href]')]})
publications.sort(key=lambda p: p['date'], reverse=True)

news = []
for path in sorted((ROOT / 'post').glob('*/index.html')):
    s = load(path)
    title = s.find('h1')
    if not title:
        continue
    post = {'id': path.parent.name, 'content': {}, 'date': s.select_one('meta[property="article:published_time"]')['content'][:10]}
    for lang, prefix in [('zh', ''), ('en', 'en/')]:
        page = f'{prefix}post/{post["id"]}/index.html'
        p = ROOT / page
        if not p.exists():
            raise ValueError(f'Missing English news page: {p}')
        local = load(p)
        article = local.select_one('.article-style')
        post['content'][lang] = {'title': text(local.h1), 'html': clean_html(article, page),
                                'summary': text(article.find('p'))[:240] if article else ''}
    news.append(post)
news.sort(key=lambda n: n['date'], reverse=True)

research = {}
for lang, prefix in [('zh', ''), ('en', 'en/')]:
    page = prefix + 'event/index.html'
    s = load(ROOT / page)
    sections = []
    for section in s.select('section.home-section'):
        title = text(section.find('h1'))
        lead = section.select_one('.hero-lead')
        if not lead:
            continue
        # The old research overview has hard-coded counts that disagree with its roster.
        for p in lead.find_all('p'):
            for string in list(p.find_all(string=True)):
                value = str(string)
                value = re.sub(r'研究团队包括博士后1人，在读博士生5人，在读硕士生9人，本科生6人。', '', value)
                value = re.sub(r'The research team comprises 1 postdoctoral researcher, 5 Ph\.D\. students, 9 master\'s students, and 6 undergraduate students\.', '', value)
                string.replace_with(value)
        for img in lead.find_all('img'):
            if not (ROOT / unquote(urlparse(urljoin('/' + page, img.get('src', ''))).path).lstrip('/')).is_file():
                img.decompose()
        for wrapper in lead.find_all(['table', 'tbody', 'tr', 'td']):
            wrapper.unwrap()
        sections.append({'title': title, 'html': clean_html(lead, page)})
    research[lang] = sections

for name in ['sustech2.jpg', 'stair.jpg', 'icon_hu_cad48d5bae1d0c97.png']:
    local_asset('/media/' + name, 'index.html')

out = {'members': members, 'publications': publications, 'news': news, 'research': research}
(DATA / 'site.json').write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
audit = {'legacyMembers': 40, 'newMasters': [m['name']['zh'] for m in members if m['isNew'] and m['role'] == 'master'],
         'newUndergraduates': [m['name']['zh'] for m in members if m['isNew'] and m['role'] == 'undergraduate'],
         'updatedAlumni': list(updates), 'counts': {'members': len(members), 'publications': len(publications), 'news': len(news)},
         'templateReview': '只导入明确填写的个人资料；剔除空栏目、暂无、照片提示和毕业去向提示。陈冠霖按材料保留本科身份。旧站仅按 people 总览导入成员，论文合作者不计入成员。',
         'undergraduateConfirmation': '用户确认：陈冠霖本科在读，以材料为准。',
         'companySource': 'https://www.bridgedp.com/articles/financing',
         'companyCrossReference': 'https://lovethinkinghard.github.io/',
         'dates': '未提供的毕业、结业或出站年份不作推断。旧站历史教育经历保留；本次明确离站的记录去掉至今。'}
(DATA / 'migration-audit.json').write_text(json.dumps(audit, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(audit, ensure_ascii=False, indent=2))
