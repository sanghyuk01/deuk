import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 도메인을 등록한 후 실제 운영 주소로 변경하세요.
  site: 'https://deuk.kr',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});
