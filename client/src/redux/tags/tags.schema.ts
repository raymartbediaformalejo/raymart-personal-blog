import z from "zod";

export const tagsSchema = z.object({
  _id: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
