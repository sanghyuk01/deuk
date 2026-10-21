import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { POST_CATEGORIES } from './data/categories';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.enum(POST_CATEGORIES)).default([]),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    status: z.enum(['진행 중', '완료', '유지보수']),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    github: z.url().optional(),
    website: z.url().optional(),
  }),
});
export const collections = { posts, projects };
