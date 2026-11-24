# rollingdraft

The hub site for [rollingdraft.com](https://rollingdraft.com): an About page,
**Sidequests** (one card per side project) and a Markdown **blog**. Built with
[Astro](https://astro.build) as a fully static site and hosted as a static Cloudflare Worker.

Each project lives in its own repo and on its own subdomain, for example
[cocolit.rollingdraft.com](https://cocolit.rollingdraft.com). This site only links to them.

## Commands

```bash
npm install        # Node 24 (see .node-version)
npm run dev        # http://localhost:4321, drafts included
npm run check      # type-check the pages and content
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

## Adding content

**A blog post:** copy `src/content/blog/post-template.md` to
`src/content/blog/<slug>.md`. The file name becomes `/blog/<slug>`. Posts with
`draft: true` show in `npm run dev` but are left out of the build and the RSS feed.
Put images in `public/blog/<slug>/`.

**A project:** add `src/content/projects/<slug>.md` with `title`, `summary`,
`status` (`live`, `building`, `paused` or `archived`), `started`, and optionally
`url`, `repo`, `tags` and `order`. The Markdown body is the write-up at
`/sidequests/<slug>`. A post with `project: <slug>` is listed on that project's page.

The frontmatter schema is in `src/content.config.ts`. A build fails on a missing
or mistyped field.

## Shared brand

`public/brand.css` is served at `https://rollingdraft.com/brand.css`. It holds
the colours, the font and the `.rd-wordmark` header style. Projects link to it
instead of copying it:

```html
<link rel="stylesheet" href="https://rollingdraft.com/brand.css">
<a class="rd-wordmark" href="https://rollingdraft.com">rollingdraft<span class="rd-dot">.</span></a>
```

## Deployment

The site is a static-assets-only Cloudflare Worker, configured in
`wrangler.jsonc`. Workers Builds is connected to this repo: every push to `main`
runs `npm run build` and then `npx wrangler deploy`, which uploads `dist/`.
The `name` in `wrangler.jsonc` must match the Worker in the dashboard (`rollingdraft`).

- Live (until the custom domain is attached): https://rollingdraft.nischal-singh38.workers.dev
- Unknown paths serve `dist/404.html` with a 404 status.
- `npx wrangler dev` serves the built `dist/` locally the same way production does.
