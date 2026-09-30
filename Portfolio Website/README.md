# Abhishek Soni — AI Creative Producer

A complete static React portfolio with an ivory / charcoal / rust art direction, an interactive procedural optical assembly and an editorial project system. Designed for GitHub Pages, including repository subpaths.

## Before publishing

- Set your real email and social profile URLs in `src/data/siteConfig.ts`. Empty values intentionally hide their links. There are no invented contact addresses. Setting email enables the functional **Start a project** mailto CTA.
- Replace the clearly labelled demo content with your approved portfolio work. All six sample entries are **DEMO PROJECTS**. Tissot is an independent concept, not a client claim. Preet and the other names are fictional concepts. Three original generated artworks are reused across six entries to demonstrate pagination without redundant media.
- No actual project films were supplied. Video playback and hover previews are implemented and become available when you add a video path. There is no pretend play button.
- Review the biography and project descriptions before publishing.

## Overview

Cinema × AI × Advertising × Technology × Storytelling. A lightweight static deployment with no server, database, account, or runtime API key. Project URLs use `/#/project/slug` for reliable refreshes on GitHub Pages.

## Features

- Large editorial hero and procedural 3D camera aperture with damped pointer, idle and scroll movement.
- Locally rendered still fallback for mobile, reduced motion, loading and WebGL failure.
- Desktop trailing cursor with OPEN / VIEW / PLAY / DRAG states; native cursor for touch and reduced motion.
- Magnetic CTAs, restrained card tilt and image parallax, GSAP scroll choreography, desktop Lenis scrolling.
- Three visible cards on desktop, two on tablet, one primary card on mobile; swipe, mouse drag, buttons and keyboard navigation.
- Data-generated project index and reusable detail route, media galleries, optional films, process and adjacent project navigation.
- Expandable services, scroll-driven process, keyboard-accessible skill tabs, custom mobile navigation and route transitions.
- Lazy 3D/detail bundles, responsive local WebP images, on-demand hover video, error fallbacks.
- Build-generated SEO, robots and sitemap, automated GitHub Pages workflow.

## Tech stack

React 19, TypeScript, Vite, Three.js, React Three Fiber, Drei, GSAP / ScrollTrigger, Lenis, React Router, modern CSS. Node is used only for development/build, never by the deployed site.

## Folder structure

```text
abhishek-ai-portfolio/
├── .github/workflows/deploy.yml
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── playwright.config.ts
├── README.md
├── public/
│   ├── favicon/favicon.svg
│   ├── images/
│   │   ├── projects/{tissot,preet,afterlight}/
│   │   │   ├── thumbnail.webp
│   │   │   └── thumbnail-small.webp
│   │   ├── profile/
│   │   └── ui/aperture.webp
│   ├── videos/projects/
│   ├── models/
│   └── fonts/
├── scripts/new-project.mjs
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── animations/scroll.ts
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroScene.tsx
│   │   ├── Loader.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Media.tsx
│   │   ├── Navigation.tsx
│   │   ├── Process.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Projects.tsx
│   │   └── Services.tsx
│   ├── data/{projects,profile,services,siteConfig}.ts
│   ├── hooks/{useMediaQuery,useMagnetic}.ts
│   ├── three/{Scene,HeroObject}.tsx
│   ├── utils/helpers.ts
│   └── styles/{globals,variables,animations}.css
└── tests/portfolio.spec.ts
```

Navigation includes the mobile menu, Projects owns carousel and index, About owns skills, and Contact exports the footer. Closely related responsibilities are kept together rather than creating empty abstraction files.

## Installation

Use Node.js **22.12+** (Node 22 LTS recommended).

```bash
npm install
```

The checked-in lockfile makes builds reproducible. CI uses `npm ci`.

## Development

```bash
npm run dev
```

Open the local address printed by Vite.

## Production build

```bash
npm run build
```

Type checking runs first. Vite writes static files to `dist/`. Do not commit `node_modules/` or `dist/`.

## Preview

```bash
npm run preview
```

Optional subpath rehearsal:

```bash
VITE_BASE_PATH=/portfolio/ VITE_SITE_URL=https://USERNAME.github.io/portfolio/ npm run build
npm run preview
```

Open the printed preview origin plus `/portfolio/`. The normal default base is `./`; CI derives the correct deployment base from GitHub Pages itself.

## Adding projects

1. Create `public/images/projects/my-project/` and, if needed, `public/videos/projects/my-project/`.
2. Add your optimized, licensed media.
3. Add one object to the array in `src/data/projects.ts`. Use a unique `id` and `slug`, and set `order` to its display position.
4. Run `npm run build`.
5. Commit and push to `main`.
6. GitHub Pages redeploys automatically.

No edits to the card, carousel, index or detail component are needed. All entries render; `featured` is available as editorial metadata for future filtering. `order` controls the collection order.

Example (copy into the projects array):

```ts
{
  id: 'my-project',
  title: 'MY PROJECT',
  subtitle: 'A story worth telling',
  slug: 'my-project',
  category: 'AI PRODUCT FILM',
  year: 2026,
  description: 'An accurate description of this project and your role.',
  role: 'Creative direction · Production',
  // client: 'Only name a real, approved client',
  tools: ['Your actual tools'],
  thumbnail: 'images/projects/my-project/thumbnail.webp',
  thumbnailSmall: 'images/projects/my-project/thumbnail-small.webp',
  hero: 'images/projects/my-project/hero.webp',
  preview: 'videos/projects/my-project/preview.mp4',
  video: 'videos/projects/my-project/hero.mp4',
  captions: 'videos/projects/my-project/captions.vtt',
  gallery: [{ src: 'images/projects/my-project/shot-01.webp', alt: 'Describe what this frame shows' }],
  tags: ['Product'],
  featured: true,
  demo: false,
  order: 7,
  process: [{ title: 'The concept', description: 'Explain your creative decisions.' }],
}
```

Remove optional media properties if you have no files; do not put empty or nonexistent placeholder paths in them. `demo: false` is appropriate only for actual work you can represent.

### Local content helper

```bash
npm run project:new -- my-project "My Project"
```

This creates media folders and an editable `project-drafts/my-project.json`. Edit it, then copy the object into `projects.ts`. It never overwrites an existing draft. Drafts are not part of the published app and are not a second data source. This is a local authoring utility, not a secure cloud admin panel.

## Adding images

Put files under `public/images/projects/<slug>/`. Use WebP or AVIF with a 1400–1800px full image and an optional 640px thumbnail. Aim for 100–300KB per image. Keep path case exact. Data paths are relative to `public` with **no leading slash**. The `asset()` helper prepends Vite’s deployment base. Remote HTTPS URLs also work, subject to the remote host’s access policy. Provide descriptive gallery alt text. Missing images render a labelled neutral fallback.

## Adding videos

Use browser-compatible MP4 (H.264 video, AAC audio) and optionally VTT captions. Put them in `public/videos/projects/<slug>/`. Keep muted preview loops short (about 3–6 seconds, ideally under 2MB). Add `preview` for the hover loop and `video` for the full film. Preview media loads only on desktop hover and pauses on leave. Touch and reduced-motion users use the native controls on detail pages. Full films have `preload="none"`, a poster and standard controls. Failed media displays an availability message. Include captions for meaningful spoken audio; ensure music/media rights. Large movies may exceed GitHub’s file limit (100MB); use a static media CDN URL or an external project link instead. The site does not upload or transcode video.

## Changing personal information

Edit `src/data/siteConfig.ts` for name, title, email, Instagram, LinkedIn, YouTube, description, SEO URL and accent colors. Keep the accent contrast accessible. Empty contact values are deliberately omitted from the public interface. Email automatically enables mailto links. Use full HTTPS social URLs. Edit `profile.ts` for the biography and skills. Edit `services.ts` for services and process copy. The hero automatically splits the configured name between its first word and remaining words.

SEO tags are emitted into the built HTML. GitHub Actions provides the canonical URL; you may set `seo.siteUrl` for a custom domain, including a trailing slash. Hash detail URLs are reliable but are not independent indexable HTML pages: the sitemap includes only the canonical homepage. Project titles update for visitors; link preview crawlers see the homepage metadata. This is an explicit static-hosting tradeoff, not an invented server feature.

## GitHub setup

1. Create a GitHub repository (for example `abhishek-ai-portfolio`).
2. Upload **the contents of this folder**, including `.github`, at the repository root. Do not upload the enclosing `outputs` folder or the ZIP itself.
3. Commit and push to the `main` branch.
4. Open repository **Settings**.
5. Open **Pages**.
6. Set **Source → GitHub Actions**.
7. Open **Actions** and wait for “Deploy portfolio to GitHub Pages” to finish. If the initial run preceded enabling Pages, rerun it.

The workflow checks out code, sets up Node 22, runs `npm ci`, builds with the correct Pages base, uploads `dist` and deploys it. The deployment job exposes the published URL. No runtime server or manual `dist` upload is required.

The normal address is `https://USERNAME.github.io/REPOSITORY-NAME/`. User/org repositories named `USERNAME.github.io` use the root instead. HashRouter keeps project refreshes functional on both.

## Custom domain

Add your domain in repository **Settings → Pages → Custom domain**, then follow GitHub’s displayed DNS instructions with your DNS provider. Enable HTTPS once available. Set `siteConfig.seo.siteUrl` to `https://your-domain.example/` (replace with your real domain). GitHub’s configure-pages action supplies the correct base; do not hardcode your old repository path. If your Pages setup requires a CNAME file, add `public/CNAME` containing your domain on one line. Push and verify the canonical and sitemap.

## Accessibility and motion

Keyboard-visible focus, skip link, semantic sections, live carousel counter, expandable services, keyboard tabs, Escape-dismissable/focus-contained mobile menu. Hover enhancements are never the only way to open work. Carousel keyboard arrows operate when its region has focus. Respect reduced motion, disable smooth scrolling, disable hover films and use the aperture still. Touch uses native swiping and no custom cursor. The intentionally brief loader waits for actual font readiness, not fake percentages.

## Testing

```bash
npx playwright install chromium
npm test
```

Tests cover the requested six viewport sizes, overflow, card navigation, index selection, direct hash routes, invalid slugs, reduced motion and mobile menu behavior. For a locally installed Chrome, set `PLAYWRIGHT_CHROME_PATH` to its executable. See `VERIFICATION.md` for the actual verification performed on this delivery.

## Assets and limitations

The three included concept images were generated for this demo. The optical object is procedural geometry and its fallback is a local render, not an external model. Fonts use device system stacks, so no external font requests or font licenses are needed. No private data, external analytics, backend, cloud admin, fake authentication or tracking is included. Replace demo artwork and copy with actual approved deliverables. The source is deployable; the owner’s contact details and finished films remain content inputs.
