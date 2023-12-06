import z from "zod";

import { postsSchema, postSchema, searchPostParams } from "./posts.schema";

export type TPost = z.infer<typeof postSchema>;
export type TPostsResponse = z.infer<typeof postsSchema>;
export type TSearchPostParams = z.infer<typeof searchPostParams>;
