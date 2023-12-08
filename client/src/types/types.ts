import z from "zod";
import { articleParamsSchema } from "./schema/Post.schema";
import { loginSchema } from "./schema/Login.schema";

export type TPostsQueryParams = z.infer<typeof articleParamsSchema>;

export type TLogin = z.infer<typeof loginSchema>;
