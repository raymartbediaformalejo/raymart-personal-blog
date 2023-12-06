import { z } from "zod";

export const postSchema = z.object({
  _id: z.string(),
  author: z.string(),
  category: z.array(z.string()),
  tag: z.array(z.string()),
  title: z.string(),
  image: z.string(),
  summary: z.string(),
  content: z.string(),
  status: z.string(),
  visibility: z.string(),
  featured: z.boolean(),
  articles: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});

export const postsSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  posts: z.array(postSchema),
});

export const searchPostParams = z.object({
  q: z.string().optional(),
  tag: z.array(z.string()).optional(),
  sort: z.array(z.string()).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
