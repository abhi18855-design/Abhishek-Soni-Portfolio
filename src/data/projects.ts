export interface Project {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  year: number;
  description: string;
  role?: string;
  client?: string;
  tools: string[];
  thumbnail: string;
  thumbnailSmall?: string;
  hero?: string;
  video?: string;
  preview?: string;
  captions?: string;
  gallery?: { src: string; alt: string }[];
  tags: string[];
  featured: boolean;
  demo: boolean;
  order: number;
  projectUrl?: string;
  process: { title: string; description: string }[];
}
const conceptProcess = [
  { title: 'The intention', description: 'Find the single feeling the frame should leave behind. Build a visual treatment around light, material and a deliberate point of view.' },
  { title: 'The visual language', description: 'Explore composition, palette and camera direction. Refine the strongest frames into a coherent concept.' },
  { title: 'The next frame', description: 'This demo presents a visual direction. Finished films, production breakdowns and approved deliverables can be added here.' },
];
/** All sample entries are concepts, not commissioned work. Replace with approved work. */
export const projects: Project[] = [
  { id: '01', title: 'TISSOT', subtitle: 'Time, refined', slug: 'tissot-time-refined', category: 'AI PRODUCT FILM', year: 2026, description: 'An independent visual concept exploring the quiet precision of time. Sculpted light, tactile surfaces and a moment held still. Not commissioned by or affiliated with Tissot.', role: 'Concept direction · Visual exploration', tools: ['Generative image', 'Art direction'], thumbnail: 'images/projects/tissot/thumbnail.webp', thumbnailSmall: 'images/projects/tissot/thumbnail-small.webp', hero: 'images/projects/tissot/thumbnail.webp', tags: ['Product', 'Luxury', 'Concept'], featured: true, demo: true, order: 1, process: conceptProcess },
  { id: '02', title: 'PREET', subtitle: 'Heritage in motion', slug: 'preet-heritage-in-motion', category: 'AI FASHION FILM', year: 2026, description: 'A fictional fashion concept where traditional textiles meet cinematic space. An exploration of movement, memory and the warmth of heritage.', role: 'Concept direction · Visual exploration', tools: ['Generative image', 'Visual storytelling'], thumbnail: 'images/projects/preet/thumbnail.webp', thumbnailSmall: 'images/projects/preet/thumbnail-small.webp', tags: ['Fashion', 'Heritage', 'Concept'], featured: true, demo: true, order: 2, process: conceptProcess },
  { id: '03', title: 'AFTERLIGHT', subtitle: 'A trace of something', slug: 'afterlight', category: 'AI ADVERTISING', year: 2026, description: 'A fictional fragrance concept. Amber, sand and the last light of the afternoon become a study in desire and restraint.', role: 'Concept direction · Art direction', tools: ['Generative image', 'Product storytelling'], thumbnail: 'images/projects/afterlight/thumbnail.webp', thumbnailSmall: 'images/projects/afterlight/thumbnail-small.webp', tags: ['Fragrance', 'Product', 'Concept'], featured: true, demo: true, order: 3, process: conceptProcess },
  { id: '04', title: 'STILL / MOVING', subtitle: 'A study in precision', slug: 'still-moving', category: 'GENERATIVE VISUALS', year: 2026, description: 'A companion demo study in metallic texture and macro composition. Reuses the Time, refined concept artwork to demonstrate the project architecture.', tools: ['Generative image', 'Composition'], thumbnail: 'images/projects/tissot/thumbnail.webp', thumbnailSmall: 'images/projects/tissot/thumbnail-small.webp', tags: ['Study', 'Material'], featured: true, demo: true, order: 4, process: conceptProcess },
  { id: '05', title: 'THE IN-BETWEEN', subtitle: 'Stories in the fabric', slug: 'the-in-between', category: 'VISUAL CONCEPT', year: 2026, description: 'A companion fashion direction exploring architecture and silhouette. Reuses the Heritage in motion concept artwork as a clearly labelled demo.', tools: ['Art direction', 'Visual storytelling'], thumbnail: 'images/projects/preet/thumbnail.webp', thumbnailSmall: 'images/projects/preet/thumbnail-small.webp', tags: ['Fashion', 'Narrative'], featured: true, demo: true, order: 5, process: conceptProcess },
  { id: '06', title: 'FORM / FEELING', subtitle: 'Objects with atmosphere', slug: 'form-feeling', category: 'PRODUCT CONCEPT', year: 2026, description: 'A companion product study in light and negative space. Reuses the Afterlight concept artwork to demonstrate a growing portfolio.', tools: ['Generative image', 'Creative direction'], thumbnail: 'images/projects/afterlight/thumbnail.webp', thumbnailSmall: 'images/projects/afterlight/thumbnail-small.webp', tags: ['Product', 'Light'], featured: true, demo: true, order: 6, process: conceptProcess },
].sort((a, b) => a.order - b.order);
