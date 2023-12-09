import z from "zod";

import {
  postsSchema,
  postSchema,
  searchPostParams,
  postIdSchema,
  postResponseSchema,
} from "./posts.schema";

export type TPostId = z.infer<typeof postIdSchema>;

export type TPost = z.infer<typeof postSchema>;
export type TPostResponse = z.infer<typeof postResponseSchema>;
export type TPostResponseObject = z.infer<typeof postsSchema>;
export type TSearchPostParams = z.infer<typeof searchPostParams>;
