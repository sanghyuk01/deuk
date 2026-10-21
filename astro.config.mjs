import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 운영 주소를 SITE_URL로 지정하고, 없으면 Pages 배포 주소를 사용합니다.
  site: process.env.SITE_URL || process.env.CF_PAGES_URL || 'https://deuk.kr',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
