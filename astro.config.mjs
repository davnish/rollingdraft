// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rollingdraft.com',
  integrations: [sitemap()],
  markdown: {
    // Both themes are rendered; global.css swaps to the dark one in dark mode.
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
