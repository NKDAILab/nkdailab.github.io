// Data adapters for the original Scholar-Lite collection-shaped components.
// The reviewed bilingual migration data remains the single content source.
import type { ImageMetadata } from 'astro';
import { members, publications, news, research, gallery, patents, localPath, roleLabel, statusLabel, type Lang, type Member } from './site';
import { cleanPublicationUrl } from './publication-url';

const assets = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png}', { eager: true });
const image = (name: string) => assets['../assets/' + name]?.default;
const strip = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export interface TeamEntry {
  id: string;
  source: Member;
  data: {
    name: string; role: string; avatar: { src: string; fit: 'cover' | 'contain'; position?: string }; bio: string; title: string[];
    email: string; weight: number; website?: string; linkedin?: string; github?: string; twitter?: string; googleScholar?: string;
  };
}
export interface PublicationEntry {
  id: string;
  data: {
    title: string; authors: string[]; year: number; venue: string; type: string;
    featured: boolean; links: Record<string, string>; cover?: ImageMetadata;
    award?: string; badges?: Array<{ text: string; type: string }>;
  };
  body: string;
}
export interface NewsEntry {
  id: string;
  data: { title: string; date: Date; summary: string; description: string; cover?: ImageMetadata };
  body: string;
}
export interface ResearchEntry {
  id: string;
  data: { title: string; description: string; order: number; cover?: ImageMetadata };
  body: string;
}
export interface HonorEntry {
  id: string;
  data: { title: string; award: string; level: string; type: string; year: string; date: Date };
}
interface PatentEntry { id: string; data: { title: string; inventors: string[]; holder: string; number: string; date: Date; status: string; applicationNumber: string; applicationDate: string; grantDate: string | null; certificateUrl: string }; }

const roles: Record<string, string> = {
  faculty: 'Professor', postdoc: 'Postdoc', phd: 'PhD Student', master: 'Master Student',
  undergraduate: 'Undergraduate', visitor: 'Visiting Student', alumni: 'Alumni',
};
export function facultyRoleLabels(member: Member, lang: Lang): string[] {
  const roles = member.presentation.titles[lang][0];
  return roles ? roles.split(lang === 'zh' ? '、' : ' and ') : [];
}
export function teamEntries(lang: Lang): TeamEntry[] {
  return members.map((m, index) => {
    const engineersProgram = ['master', 'phd'].includes(m.role)
      && /^卓越工程师项目联培(?:硕士|博士)$/.test(m.presentation.note.zh);
    const jointPhd = m.role === 'phd' && /^.+联培博士$/.test(m.presentation.note.zh);
    return {
      id: m.id, source: m,
      data: {
        name: m.name[lang], role: roles[m.role], avatar: {
          src: m.avatar,
          fit: 'avatarFit' in m.presentation && m.presentation.avatarFit === 'contain' ? 'contain' : 'cover',
          position: 'avatarPosition' in m.presentation ? m.presentation.avatarPosition : undefined,
        },
        title: m.role === 'alumni' ? [roleLabel(m.previousRole, lang), statusLabel(m.status, lang)]
          : m.role === 'faculty' ? [...facultyRoleLabels(m, lang), 'IEEE Fellow']
          : engineersProgram ? [lang === 'zh'
            ? `${m.presentation.cohort ? `${m.presentation.cohort}级` : ''}卓越工程师项目${m.role === 'phd' ? '博士' : '硕士'}`
            : `${m.presentation.cohort ? `${m.presentation.cohort} intake · ` : ''}Outstanding Engineers Program (${m.role === 'phd' ? 'PhD' : 'Master’s'})`]
          : jointPhd ? [lang === 'zh'
            ? `${m.presentation.cohort ? `${m.presentation.cohort}级` : ''}${m.presentation.note.zh}`
            : `${m.presentation.cohort ? `${m.presentation.cohort} intake · ` : ''}${m.presentation.note.en}`]
          : m.role === 'visitor' && m.presentation.note[lang] ? [m.presentation.note[lang]]
          : m.presentation.cohort && ['phd', 'master', 'undergraduate'].includes(m.role)
            ? [lang === 'zh' ? `${m.presentation.cohort} 级${roleLabel(m.role, lang)}` : `${m.presentation.cohort} ${m.role === 'phd' ? 'PhD' : m.role === 'master' ? "master’s" : 'undergraduate'} intake`] : [],
        bio: m.role === 'alumni' ? m.destination[lang] : engineersProgram || jointPhd || m.role === 'visitor' ? '' : m.presentation.note[lang],
        email: m.email,
        weight: index + 1,
        website: m.links.find(l => l.label === 'Website')?.url,
        googleScholar: m.links.find(l => l.url.includes('scholar.google'))?.url,
      },
    };
  });
}

// Stable keys keep Chinese source captions out of English page rendering.
export function publicationEntries(): PublicationEntry[] {
  return publications.map((paper, index) => {
    const links: Record<string, string> = {};
    for (const link of paper.links) {
      const caption = link.label.toLowerCase();
      const key = /引用|cite|citation/.test(caption) ? 'citation'
        : caption === 'pdf' ? 'pdf' : caption === 'arxiv' ? 'arxiv'
        : caption === 'doi' ? 'doi'
        : /^(paper|link|source|publisher|conference|论文来源|论文链接)$/.test(caption) ? 'website' : undefined;
      // Only paper sources, PDFs and bibliographic citations are displayed.
      if (!key) continue;
      links[key] = key === 'citation' ? '/citations/' + paper.id + '.bib' : cleanPublicationUrl(link.url);
    }
    return { id: paper.id, data: { title: paper.title, authors: paper.authors, year: paper.year, venue: paper.venue,
      type: 'paper', featured: index < 3, links }, body: paper.abstract };
  });
}
export function newsEntries(lang: Lang): NewsEntry[] {
  return news.map(n => ({ id: n.id, data: { title: n.content[lang].title, date: new Date(n.date + 'T12:00:00Z'),
    summary: n.content[lang].summary, description: n.content[lang].summary,
    cover: image('news/' + n.id + '.png') || image('news/' + n.id + '.jpg') }, body: n.content[lang].html }));
}
export const RESEARCH_IDS = ['areas', 'group', 'results'];
export const galleryEntries = (lang: Lang) => gallery.map(photo => ({
  id: photo.id, caption: photo.caption[lang], original: photo.original,
  image: photo.image.startsWith('/') ? undefined : image(photo.image),
  width: 'width' in photo ? photo.width : undefined,
  height: 'height' in photo ? photo.height : undefined,
}));
export function researchEntries(lang: Lang): ResearchEntry[] {
  return research[lang].map((area, index) => ({ id: RESEARCH_IDS[index], data: { title: area.title,
    description: index === 0 ? strip(area.html) : strip(area.html).slice(0, lang === 'zh' ? 120 : 240), order: index,
    cover: index === 1 ? image('research-group.jpg') : index === 2 ? image('research-results.png') : undefined }, body: area.html }));
}
interface TemplateCollections {
  team: TeamEntry[]; publications: PublicationEntry[]; books: PublicationEntry[];
  news: NewsEntry[]; activities: NewsEntry[]; research: ResearchEntry[];
  patents: PatentEntry[]; honors: HonorEntry[];
}
export async function getCollection<K extends keyof TemplateCollections>(name: K, lang: Lang): Promise<TemplateCollections[K]> {
  const collections: TemplateCollections = {
    team: teamEntries(lang), publications: publicationEntries(), news: newsEntries(lang), research: researchEntries(lang),
    activities: [], books: [], honors: [],
    patents: patents.filter(p => p.source.sheet === 'NKD' && p.certificateUrl).map(p => ({ id: p.id, data: { title: p.title[lang], inventors: p.inventors[lang], holder: p.holder[lang], number: p.publicationNumber || p.patentNumber || p.applicationNumber, date: new Date(p.sortDate + 'T12:00:00Z'), status: p.status, applicationNumber: p.applicationNumber, applicationDate: p.applicationDate, grantDate: p.grantDate, certificateUrl: p.certificateUrl } })),
  };
  return collections[name];
}
export const templatePath = (lang: Lang, path: string) => localPath(lang, path);
