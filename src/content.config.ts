import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: src/content/blog/<slug>.md
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // The project slug (file name in src/content/projects) this post is about.
    project: z.string().optional(),
    // Drafts are visible in `npm run dev` but left out of the build.
    draft: z.boolean().default(false),
  }),
});

// Sidequests: one file per project, src/content/projects/<slug>.md.
// The body is the longer write-up shown on the project's page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    url: z.url().optional(),
    repo: z.url().optional(),
    status: z.enum(['live', 'building', 'paused', 'archived']),
    started: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Lower numbers come first; ties fall back to newest first.
    order: z.number().default(100),
  }),
});

export const collections = { blog, projects };
