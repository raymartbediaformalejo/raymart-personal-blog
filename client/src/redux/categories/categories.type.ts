import z from "zod";

import { categoriesSchema } from "./categories.schema";

export type TCategoryResponse = z.infer<typeof categoriesSchema>;
