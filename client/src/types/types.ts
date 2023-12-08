import z from "zod";
import { articleParamsSchema } from "./schema/Post.schema";
import { loginSchema } from "./schema/Login.schema";

export type TPostsQueryParams = z.infer<typeof articleParamsSchema>;

export type TLogin = z.infer<typeof loginSchema>;

export type TAuthToken = {
  accessToken: string | null;
};

export type TAuthInitial = {
  username: string;
  password: string;
};

export type TAuthMsgResponse = {
  message: string;
};
