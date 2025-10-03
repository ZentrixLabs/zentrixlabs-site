import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    short: z.string(),
    status: z.enum(['active','beta','mvp','archived']).default('active'),
    repo: z.string().url().optional(),
    website: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    published: z.boolean().default(true),
    order: z.number().default(100),
  }),
});

export const collections = { projects };
