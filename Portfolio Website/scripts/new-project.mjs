import { mkdir, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
const [slug, ...titleWords] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !titleWords.length) {
  console.error('Usage: npm run project:new -- my-project "My Project"'); process.exit(1);
}
const path = resolve('project-drafts', `${slug}.json`);
try { await access(path); console.error('Draft already exists; nothing overwritten.'); process.exit(1); } catch {}
await mkdir('project-drafts', { recursive: true });
await mkdir(`public/images/projects/${slug}`, { recursive: true });
await mkdir(`public/videos/projects/${slug}`, { recursive: true });
const project = { id: slug, slug, title: titleWords.join(' '), subtitle: 'Add a subtitle', category: 'VISUAL CONCEPT', year: new Date().getFullYear(), description: 'Describe the work and your actual contribution.', role: '', tools: [], thumbnail: `images/projects/${slug}/thumbnail.webp`, tags: [], featured: true, demo: true, order: 99, process: [] };
await writeFile(path, `${JSON.stringify(project, null, 2)}\n`, { flag: 'wx' });
console.log(`Created media folders and ${path}. Edit the draft, then copy its object into src/data/projects.ts. The draft is not published automatically.`);
