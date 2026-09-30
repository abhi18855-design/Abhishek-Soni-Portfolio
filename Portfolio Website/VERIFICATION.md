# Verification

Verified on 30 September 2026.

- TypeScript production build completed successfully with a GitHub Pages-style `/portfolio/` base path.
- The built site loaded correctly from the repository subpath.
- Responsive layout was visually checked at 1440×900, 1280×800, 1024×768, 768×1024, 430×932, and 390×844.
- No horizontal page overflow was found at those viewport sizes.
- Desktop uses the interactive WebGL aperture; mobile uses the locally rendered still fallback.
- Carousel buttons, project index selection, keyboard navigation, mobile menu, section navigation, skill tabs, project detail pages, adjacent-project navigation, refreshes, and invalid-project handling were checked in the browser.
- No application console errors were present during the main desktop inspection.
- The local project-draft helper created the expected folders and JSON draft without overwriting source data.

The included Playwright suite is ready for automated browser testing. In this build environment, the separately installed Brave executable aborted when Playwright launched it, so the checks above were completed through the Codex in-app Chromium browser instead. Run `npx playwright install chromium && npm test` on a normal local or CI environment for the automated suite.

Before publishing, add real contact URLs in `src/data/siteConfig.ts` and replace demo project copy/media with approved portfolio work.
