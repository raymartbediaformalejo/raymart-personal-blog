import z from "zod";
import { articleParamsSchema } from "./schema/Post.schema";
export type TPostsQueryParams = z.infer<typeof articleParamsSchema>;
