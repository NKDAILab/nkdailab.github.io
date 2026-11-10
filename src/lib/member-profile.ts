import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5';
import type { Lang } from './site';

type Node = DefaultTreeAdapterTypes.Node;
type Element = DefaultTreeAdapterTypes.Element;
type SectionKind = 'education' | 'work' | 'interests' | 'honors' | 'other';
interface Profile {
  html: string;
  education: { course: string; institution: string }[];
  interests: string[];
  honors?: string[];
}
interface ProfileSection { kind: SectionKind; html: string; }

const order: Record<SectionKind, number> = { education: 0, work: 1, interests: 2, honors: 3, other: 4 };
const labels = {
  zh: { education: '教育经历', interests: '研究方向', honors: '个人荣誉' },
  en: { education: 'Education', interests: 'Research Interests', honors: 'Personal Honors' },
};
const isElement = (node: Node): node is Element => 'tagName' in node;
const hasText = (value: string) => /[^\s\u200b\ufeff]/u.test(value);
const text = (node: Node): string => 'value' in node ? node.value
  : 'childNodes' in node ? node.childNodes.map(text).join('') : '';
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!);

function kindOf(heading: Element): SectionKind {
  const label = text(heading).replace(/[\s：:]/g, '').toLowerCase();
  if (/^(教育经历|教育背景|education|educationalbackground)$/.test(label)) return 'education';
  if (/^(工作经历|工作经验|workexperience|professionalexperience|employment)$/.test(label)) return 'work';
  if (/^(研究方向|研究兴趣|researchinterests?|researchareas?)$/.test(label)) return 'interests';
  if (/^(个人荣誉|荣誉|获奖|personalhonou?rs|honou?rs|awards|honou?rsandawards)$/.test(label)) return 'honors';
  return 'other';
}

function hasContent(node: Node): boolean {
  if ('value' in node) return hasText(node.value);
  if (isElement(node)) {
    if (/^(h[1-6]|script|style|template)$/.test(node.tagName)) return false;
    if (/^(img|video|audio|iframe|object|embed)$/.test(node.tagName)
      && node.attrs.some(attribute => /^(src|srcset|data)$/.test(attribute.name) && attribute.value.trim())) return true;
    if (node.tagName === 'svg' && node.childNodes.some(isElement)) return true;
  }
  return 'childNodes' in node && node.childNodes.some(hasContent);
}

const hasHtmlContent = (html: string) => hasContent(parseFragment(html));

export function memberProfileSections(profile: Profile, lang: Lang) {
  const fragment = parseFragment(profile.html, { sourceCodeLocationInfo: true });
  const headings = fragment.childNodes.filter((node): node is Element =>
    isElement(node) && /^h[1-6]$/.test(node.tagName) && !!node.sourceCodeLocation);
  const firstHeading = headings[0]?.sourceCodeLocation?.startOffset ?? profile.html.length;
  const introduction = profile.html.slice(0, firstHeading);
  const sections: ProfileSection[] = headings.flatMap((heading, index) => {
    const location = heading.sourceCodeLocation!;
    const end = headings[index + 1]?.sourceCodeLocation?.startOffset ?? profile.html.length;
    const body = profile.html.slice(location.endOffset, end);
    // Keep source HTML, links and heading IDs intact when moving a section.
    return hasHtmlContent(body) ? [{ kind: kindOf(heading), html: profile.html.slice(location.startOffset, end) }] : [];
  });

  const education = profile.education.filter(entry => hasText(entry.course) || hasText(entry.institution));
  if (education.length && !sections.some(section => section.kind === 'education')) {
    sections.push({ kind: 'education', html: `<h2>${labels[lang].education}</h2><ul>${education.map(entry =>
      `<li>${hasText(entry.course) ? `<strong>${escape(entry.course)}</strong>` : ''}${hasText(entry.course) && hasText(entry.institution) ? '<br />' : ''}${hasText(entry.institution) ? escape(entry.institution) : ''}</li>`).join('')}</ul>` });
  }
  for (const kind of ['interests', 'honors'] as const) {
    const entries = (profile[kind] || []).filter(hasText);
    if (entries.length && !sections.some(section => section.kind === kind)) {
      sections.push({ kind, html: `<h2>${labels[lang][kind]}</h2><ul>${entries.map(entry => `<li>${escape(entry)}</li>`).join('')}</ul>` });
    }
  }

  return {
    introduction: hasHtmlContent(introduction) ? introduction : '',
    sections: sections.sort((a, b) => order[a.kind] - order[b.kind]),
  };
}
