import z from "zod";

export const postsSchema = z.object({
  _id: z.string(),
  id: z.string(),
  author: z.string(),
  category: z.array(z.string()),
  tag: z.array(z.string()),
  title: z.string(),
  image: z.string(),
  content: z.string(),
  status: z.enum(["Published", "Draft"]),
  visibility: z.enum(["Public", "Private"]),
  featured: z.boolean(),
  articles: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
