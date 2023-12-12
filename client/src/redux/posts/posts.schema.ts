import { z } from "zod";

export const postIdSchema = z.object({
  _id: z.string(),
});

export const postSchema = z.object({
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
});

export const postSchemaWithId = postIdSchema.merge(postSchema);

const postResponseSchemaRaw = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});

export const postResponseSchema = postSchemaWithId.merge(postResponseSchemaRaw);

export const postsSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  posts: z.array(postResponseSchema),
});

export const searchPostParams = z.object({
  q: z.string().optional(),
  tag: z.array(z.string()).optional(),
  sort: z.array(z.string()).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});
