import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseFragment } from 'parse5';
import { memberProfileSections } from '../src/lib/member-profile.ts';

const empty = { html: '', education: [], interests: [], honors: [] };

test('orders resume sections while preserving the introduction, other sections and links', () => {
  const intro = '<p>A short biography.</p>';
  const paper = '<h3 id="papers">Papers</h3><p><a href="https://example.org/paper?a=1&amp;b=2">Paper title</a></p>';
  const projects = '<h3 id="projects">Projects</h3><p>Project description.</p>';
  const profile = {
    ...empty,
    html: `${intro}<h3 id="interests">Research Interests</h3><ul><li>Vision</li></ul>${paper}<h3 id="honors">Personal Honors</h3><p>Scholarship.</p><h3 id="work">Work Experience</h3><p>Research assistant.</p>${projects}`,
    education: [{ course: 'MSc', institution: 'University' }],
    interests: ['Vision'],
  };
  const result = memberProfileSections(profile, 'en');
  assert.equal(result.introduction, intro);
  assert.deepEqual(result.sections.map(section => section.kind), ['education', 'work', 'interests', 'honors', 'other', 'other']);
  assert.equal(result.sections.at(-2).html, paper);
  assert.equal(result.sections.at(-1).html, projects);
  assert.equal(result.sections.filter(section => section.kind === 'interests').length, 1);
});

test('hides missing sections and sections containing only blank markup', () => {
  const profile = {
    html: '<p> &nbsp; </p><!-- note --><h3>工作经历</h3><ul><li><br /></li></ul><h3>研究方向</h3><p>&nbsp;&#8203;</p><h3>个人荣誉</h3><!-- empty --><h3>项目</h3><ul></ul>',
    education: [{ course: ' ', institution: '' }], interests: [' ', '\u200b'], honors: [],
  };
  assert.deepEqual(memberProfileSections(profile, 'zh'), { introduction: '', sections: [] });
});

test('renders supplied structured details, escapes text and does not duplicate existing sections', () => {
  const profile = {
    html: '<h2>Education</h2><p>Existing education description.</p><h2>Research Interests</h2><ul></ul>',
    education: [{ course: 'MSc', institution: 'A & B University' }],
    interests: ['Vision & <AI>'], honors: ['First Prize'],
  };
  const result = memberProfileSections(profile, 'en');
  assert.deepEqual(result.sections.map(section => section.kind), ['education', 'interests', 'honors']);
  assert.ok(result.sections[0].html.includes('Existing education description.'));
  assert.ok(result.sections[1].html.includes('Vision &amp; &lt;AI&gt;'));
  assert.ok(result.sections[2].html.includes('First Prize'));
  const education = memberProfileSections({ ...empty, education: profile.education }, 'zh').sections[0];
  assert.ok(education.html.includes('A &amp; B University'));
});

test('retains sections that contain a real image without accompanying text', () => {
  const image = '<h3>Project</h3><img src="/images/project.jpg" alt="" />';
  assert.equal(memberProfileSections({ ...empty, html: image }, 'en').sections[0].html, image);
});

function content(node, values = { text: [], links: [], images: [] }) {
  if ('tagName' in node && /^h[1-6]$/.test(node.tagName)) return values;
  if ('value' in node && node.value.trim()) values.text.push(node.value.trim());
  if ('attrs' in node) {
    for (const attribute of node.attrs) {
      if (attribute.name === 'href') values.links.push(attribute.value);
      if (attribute.name === 'src') values.images.push(attribute.value);
    }
  }
  if ('childNodes' in node) node.childNodes.forEach(child => content(child, values));
  return values;
}

const data = JSON.parse(await readFile(new URL('../src/data/site.json', import.meta.url), 'utf8'));
for (const member of data.members) {
  for (const lang of ['zh', 'en']) {
    test(`preserves the authored content of ${member.id} (${lang})`, () => {
      const profile = member.profile[lang];
      const result = memberProfileSections(profile, lang);
      const before = content(parseFragment(profile.html));
      const after = content(parseFragment(result.introduction + result.sections.map(section => section.html).join('')));
      for (const key of ['text', 'links', 'images']) {
        const remaining = [...after[key]];
        for (const value of before[key]) {
          const index = remaining.indexOf(value);
          assert.notEqual(index, -1, `Missing ${key}: ${value}`);
          remaining.splice(index, 1);
        }
      }
      assert.equal(result.sections.filter(section => section.kind === 'education').length, 1);
    });
  }
}
