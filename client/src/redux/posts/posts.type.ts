import z from "zod";

import { postsSchema, postSchema } from "./posts.schema";

export type TPost = z.infer<typeof postSchema>;
export type TPostsResponse = z.infer<typeof postsSchema>;
