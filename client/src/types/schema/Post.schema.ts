import z from "zod";

export const articleParamsSchema = z.object({
  q: z.string(),
  tag: z.array(z.string()),
  sort: z.array(z.string()),
  page: z.coerce.number(),
});
