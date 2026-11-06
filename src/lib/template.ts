// Data adapters for the original Scholar-Lite collection-shaped components.
// The reviewed bilingual migration data remains the single content source.
import type { ImageMetadata } from 'astro';
import { members, publications, news, research, localPath, roleLabel, statusLabel, type Lang, type Member } from './site';

const assets = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png}', { eager: true });
const image = (name: string) => assets['../assets/' + name]?.default;
const strip = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export interface TeamEntry {
  id: string;
  source: Member;
  data: {
    name: string; role: string; avatar: { src: string }; bio: string; title: string[];
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
interface SoftwareEntry { id: string; data: { title: string; developers: string[]; number: string; date: Date }; }
interface PatentEntry { id: string; data: { title: string; inventors: string[]; number: string; date: Date; status: string }; }

const roles: Record<string, string> = {
  faculty: 'Professor', postdoc: 'Postdoc', phd: 'PhD Student', master: 'Master Student',
  undergraduate: 'Undergraduate', visitor: 'Visiting Student', alumni: 'Alumni',
};
export function teamEntries(lang: Lang): TeamEntry[] {
  return members.map((m, index) => ({
    id: m.id, source: m,
    data: {
      name: m.name[lang], role: roles[m.role], avatar: { src: m.avatar },
      title: m.role === 'alumni' ? [roleLabel(m.previousRole, lang), statusLabel(m.status, lang)]
        : m.role === 'faculty' ? [lang === 'zh' ? '讲席教授' : 'Chair Professor', 'IEEE Fellow']
        : m.isNew && m.role === 'master' ? [lang === 'zh' ? '2026 级硕士研究生' : "2026 master's intake"] : [],
      bio: m.role === 'alumni' ? m.destination[lang] : m.profile[lang].bio,
      email: m.email,
      weight: index + 1,
      website: m.links.find(l => l.label === 'Website')?.url,
      googleScholar: m.links.find(l => l.url.includes('scholar.google'))?.url,
    },
  }));
}

// Stable keys keep Chinese source captions out of English page rendering.
export function publicationEntries(): PublicationEntry[] {
  return publications.map((paper, index) => {
    const links: Record<string, string> = {};
    for (const link of paper.links) {
      const caption = link.label.toLowerCase();
      const key = /引用|cite|citation/.test(caption) ? 'citation'
        : /视频|video/.test(caption) ? 'video' : caption === 'pdf' ? 'pdf'
        : /代码|code|github/.test(caption) ? 'code' : 'website';
      links[key] = key === 'citation' ? '/citations/' + paper.id + '.bib' : link.url;
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
export function researchEntries(lang: Lang): ResearchEntry[] {
  return research[lang].map((area, index) => ({ id: RESEARCH_IDS[index], data: { title: area.title,
    description: strip(area.html).slice(0, lang === 'zh' ? 120 : 240), order: index,
    cover: index === 1 ? image('research-group.jpg') : index === 2 ? image('research-results.png') : undefined }, body: area.html }));
}
interface TemplateCollections {
  team: TeamEntry[]; publications: PublicationEntry[]; books: PublicationEntry[];
  news: NewsEntry[]; activities: NewsEntry[]; research: ResearchEntry[];
  softwares: SoftwareEntry[]; patents: PatentEntry[]; honors: HonorEntry[];
}
export async function getCollection<K extends keyof TemplateCollections>(name: K, lang: Lang): Promise<TemplateCollections[K]> {
  const collections: TemplateCollections = {
    team: teamEntries(lang), publications: publicationEntries(), news: newsEntries(lang), research: researchEntries(lang),
    activities: [], books: [], softwares: [], patents: [], honors: [],
  };
  return collections[name];
}
export const templatePath = (lang: Lang, path: string) => localPath(lang, path);
