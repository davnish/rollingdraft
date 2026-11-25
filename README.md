# rollingdraft

Source for [rollingdraft.com](https://rollingdraft.com), a small site for my projects
and notes. Each project lives in its own repo and on its own subdomain, for example
[cocolit.rollingdraft.com](https://cocolit.rollingdraft.com).

Built with [Astro](https://astro.build) as a static site.

## Running it

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static output in dist/
```

## Writing

- **Posts:** copy `src/content/blog/post-template.md` to `src/content/blog/<slug>.md`.
  Posts marked `draft: true` show only in `npm run dev`.
- **Projects:** add `src/content/projects/<slug>.md`.

The fields each file needs are defined in `src/content.config.ts`.
