import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../content';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'rollingdraft',
    description: 'A running log of experiments and side projects in ML, infrastructure and AI.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
