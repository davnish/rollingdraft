# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

rollingdraft.com is the hub site for Nischal's projects and blog. It's a static Astro 7 site (Node 24, see `.node-version`). Each project lives in its own repo on its own subdomain (for example `cocolit.rollingdraft.com`, in `~/projects/cocolit`); this site only links to them.

## Commands

```bash
npm ci
npm run dev       # http://localhost:4321, drafts included
npm run check     # astro check (types + content schema), run by CI
npm run build     # static output in dist/, run by CI
npx astro preview --port 4329   # serve dist/; it daemonizes and binds localhost (not 127.0.0.1)
npx astro preview stop
```

There are no tests; `check` + `build` are the gate (`.github/workflows/ci.yml`). A build fails on a missing or mistyped frontmatter field.

## Deployment

Pushing to `main` deploys. Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy`, serving `dist/` as a static-assets-only Worker (`wrangler.jsonc`, Worker name `rollingdraft`). It's live about 1–2 minutes after the push; verify with `curl https://rollingdraft.com/...`. `html_handling: auto-trailing-slash` means internal links use trailing slashes (`/about/`), and unknown paths get `404.html`. Don't mention the Worker or workers.dev URL in public-facing text such as the README.

## Architecture

- **Content collections** (`src/content.config.ts`): `blog` (`src/content/blog/<slug>.md`) and `projects` (`src/content/projects/<slug>.md`). The file name is the slug and URL. `src/content.ts` holds the sorted getters: `getPosts()` drops `draft: true` posts except in dev; `getProjects()` sorts by `order`, then newest. A post's `project: <slug>` lists it on that project's page. `post-template.md` is a permanent draft used as the copy-from template.
- **Routes:** projects live at `/projects/` (`src/pages/projects/`). They used to be `/sidequests/`; `public/_redirects` 301s the old paths, so keep it.
- **`src/layouts/Base.astro`** wraps every page: meta/og tags (the default `description` doubles as the home page's search description, so keep it in sync with the intro in `src/pages/index.astro`), the theme script, the header nav array, and the footer icon links.
- **Theme:** light by default. Dark applies only when `<html data-theme="dark">`, set by the toggle and saved in `localStorage.theme`; the OS setting is deliberately not followed. A head script applies it before first paint.
- **Styles:** `public/brand.css` holds the shared `--rd-*` tokens (light plus `[data-theme='dark']`) and the `.rd-wordmark`/`.rd-mark` classes. It's served at `https://rollingdraft.com/brand.css` for other projects, so keep it free of page layout. `src/styles/global.css` is this site's layout and components.
- **Static assets:** `public/og.png` (share image) is rendered from `scripts/og-image.html`; the regenerate command is in that file's top comment. Regenerate it when the home headline changes. `public/me.jpg` is the About photo (the GitHub avatar, resized to 240px). `public/favicon.svg` is the "rd." mark built from Geist glyph paths; `src/components/RdMark.astro` is the same mark inline.

## Design rules

The look follows Vercel's DESIGN.md, applied selectively:
- **Type:** Geist / Geist Mono, weight 600 at most, small and subtle headings. The user explicitly doesn't want large headlines.
- **Colour:** ink `#171717` on `#fafafa`, grey hairline borders, blue (`--rd-link`) only for links in running text, and the orange `--rd-brand` dot as the single brand colour. The user reviewed alternative ink colours and chose to keep black.
- **Nav:** plain words; the current page gets a short orange bar under it. The user rejected grey pill backgrounds.
- **Interactions:** quiet hover and press micro-interactions, and 44px tap targets on coarse pointers. The header must fit at 320px wide.

Check visual changes in headless Chrome against `npx astro preview`. Headless windows can't go below about 500px wide, so test narrow widths by putting the page in an `<iframe width="320">`.

## Conventions

- The user writes the site copy (the headline, intro and About text). Fix grammar when asked, but don't rewrite their voice unprompted.
- Commit and deploy only when the user asks. Never add Claude `Co-Authored-By` or other attribution trailers to commits.
- `.claude/skills/`, `skills-lock.json` and `.taste-skill/` are third-party agent skills installed locally and are gitignored.
