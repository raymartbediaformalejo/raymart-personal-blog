import z from 'zod'

import { postsSchema } from "./posts.schema";

export type TPostsResponse = z.infer<typeof postsSchema>