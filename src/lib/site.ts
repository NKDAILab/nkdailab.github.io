import data from '../data/site.json';

export type Lang = 'zh' | 'en';
export type Member = (typeof data.members)[number];
export type Publication = (typeof data.publications)[number];
export type News = (typeof data.news)[number];
export const { members, publications, news, research } = data;
export const activeMembers = members.filter(m => m.role !== 'alumni');
export const alumni = members.filter(m => m.role === 'alumni');
export const localPath = (lang: Lang, path = '') => {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return `${lang === 'en' ? '/en' : ''}/${normalized ? normalized + '/' : ''}`;
};
export const labels = {
  zh: {
    home: '主页', research: '研究方向', team: '实验室成员', publications: '发表成果', news: '实验室新闻', join: '加入我们', search: '搜索',
    alumni: '毕业与离站成员', current: '在组成员', all: '全部成员', education: '教育经历', interests: '研究方向',
    email: '电子邮箱', website: '个人主页', back: '返回成员列表', destination: '毕业 / 离站去向',
    previousRole: '原身份', status: '状态', name: '姓名', details: '查看详情', viewAll: '查看全部',
    latestNews: '实验室动态', latestPapers: '近期论文', unknown: '未提供', empty: '暂无相关记录',
  },
  en: {
    home: 'Home', research: 'Research', team: 'People', publications: 'Publications', news: 'News', join: 'Join Us', search: 'Search',
    alumni: 'Alumni & Former Members', current: 'Current Members', all: 'All Members', education: 'Education', interests: 'Research Interests',
    email: 'Email', website: 'Personal Website', back: 'Back to People', destination: 'Destination',
    previousRole: 'Former Role', status: 'Status', name: 'Name', details: 'Read more', viewAll: 'View all',
    latestNews: 'Lab News', latestPapers: 'Recent Publications', unknown: 'Not provided', empty: 'No records available',
  },
};
export const roleLabels: Record<string, Record<Lang, string>> = {
  faculty: { zh: '教师', en: 'Faculty' }, postdoc: { zh: '博士后', en: 'Postdoctoral Researchers' },
  phd: { zh: '博士研究生', en: 'PhD Students' }, master: { zh: '硕士研究生', en: "Master's Students" },
  undergraduate: { zh: '本科生', en: 'Undergraduates' }, visitor: { zh: '访问学生', en: 'Visiting Students' },
  alumni: { zh: '毕业与离站成员', en: 'Alumni & Former Members' },
};
export const roleLabel = (role: string, lang: Lang) => roleLabels[role]?.[lang] || (lang === 'zh' ? '原成员' : 'Former member');
export const statusLabel = (status: string, lang: Lang) => ({
  graduated: { zh: '已毕业', en: 'Graduated' },
  completed: { zh: '已出站', en: 'Postdoc completed' },
  'course-completed': { zh: '已结业', en: 'Coursework completed' },
  active: { zh: '在组', en: 'Current' },
}[status]?.[lang] || status);
export const displayName = (m: Member, lang: Lang) => m.name[lang];
export const groups = ['faculty', 'postdoc', 'phd', 'master', 'undergraduate', 'visitor'];
export const formatDate = (date: string, lang: Lang) => new Date(date + 'T12:00:00Z').toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export type PageKind = 'home' | 'research' | 'research-detail' | 'team' | 'publications' | 'achievements' | 'activities' | 'news' | 'join' | 'search' | 'member' | 'paper' | 'article' | 'coauthor' | 'redirect';
export interface PageRoute { route?: string; kind: PageKind; lang: Lang; id?: string; target?: string; }
export function pageRoutes(): PageRoute[] {
  const routes = new Map<string, PageRoute>();
  const add = (item: PageRoute) => { if (!routes.has(item.route || '')) routes.set(item.route || '', item); };
  for (const lang of ['zh', 'en'] as const) {
    const prefix = lang === 'en' ? 'en/' : '';
    for (const kind of ['home', 'research', 'team', 'publications', 'achievements', 'activities', 'news', 'join', 'search'] as const) {
      add({ route: (prefix + (kind === 'home' ? '' : kind)).replace(/\/$/, '') || undefined, kind, lang });
    }
    ['areas', 'group', 'results'].forEach(id => add({ route: prefix + 'research/' + id, kind: 'research-detail', lang, id }));
    members.forEach(m => add({ route: prefix + 'team/' + m.id, kind: 'member', lang, id: m.id }));
    publications.forEach(p => add({ route: prefix + 'publications/' + p.id, kind: 'paper', lang, id: p.id }));
    news.forEach(n => add({ route: prefix + 'news/' + n.id, kind: 'article', lang, id: n.id }));
    const aliases: Record<string, string> = { people: 'team', authors: 'team', 'authors/page/1': 'team', event: 'research', publication: 'publications', post: 'news', activities: 'news', achievements: 'publications', contact: 'join', tour: 'research' };
    members.forEach(m => { aliases['author/' + m.name.zh] = 'team/' + m.id; aliases['author/' + m.id] = 'team/' + m.id; });
    publications.forEach(p => {
      aliases['publication/' + p.id] = 'publications/' + p.id;
      p.authorSlugs.forEach((id, index) => {
        if (!aliases['author/' + id]) add({ route: prefix + 'author/' + id, kind: 'coauthor', lang, id: p.authors[index] });
      });
    });
    news.forEach(n => { aliases['post/' + n.id] = 'news/' + n.id; });
    Object.entries(aliases).forEach(([path, to]) => add({ route: prefix + path, kind: 'redirect', lang, target: localPath(lang, to) }));
    if (lang === 'zh') {
      const chinese = [...routes.values()].filter(r => r.lang === 'zh');
      for (const r of chinese) add({ route: 'zh' + (r.route ? '/' + r.route : ''), kind: 'redirect', lang, target: r.target || localPath(lang, r.route) });
    }
  }
  return [...routes.values()];
}
