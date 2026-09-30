import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { siteConfig } from './src/data/siteConfig';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const base = env.VITE_BASE_PATH || './';
  const siteUrl = siteConfig.seo.siteUrl || env.VITE_SITE_URL || '';
  const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  return {
    base,
    server: { watch: { usePolling: true, interval: 300 } },
    plugins: [react(), {
      name: 'portfolio-seo',
      transformIndexHtml(html) {
        return { html: html.replace(/<title>.*?<\/title>/, `<title>${escape(siteConfig.seo.title)}</title>`).replace(/(<meta name="description" content=")[^"]*/, `$1${escape(siteConfig.description)}`).replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(siteConfig.seo.title)}`).replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(siteConfig.description)}`).replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${escape(siteConfig.seo.title)}`).replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${escape(siteConfig.description)}`), tags: [
          { tag: 'meta', attrs: { name: 'keywords', content: siteConfig.seo.keywords } },
          ...(siteUrl ? [
            { tag: 'link', attrs: { rel: 'canonical', href: siteUrl } },
            { tag: 'meta', attrs: { property: 'og:url', content: siteUrl } },
          ] : []),
        ] };
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${new URL('sitemap.xml', siteUrl).href}\n` : ''}` });
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteUrl ? `<url><loc>${escape(siteUrl)}</loc></url>` : ''}</urlset>` });
      },
    }],
    // Keep automatic chunks: manual grouping can pull shared React into the WebGL bundle.
  };
});
