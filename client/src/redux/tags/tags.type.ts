import z from "zod";

import { tagsSchema } from "./tags.schema";

export type TTagsResponse = z.infer<typeof tagsSchema>;
