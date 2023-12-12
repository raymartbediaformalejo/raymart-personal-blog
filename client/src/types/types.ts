import z from "zod";
import { articleParamsSchema } from "./schema/Post.schema";
import { loginSchema } from "./schema/Login.schema";
import { TPostResponse } from "../redux/posts/posts.type";

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

export type TOption = {
  value: string;
  label: string;
  id?: string;
};

export type TGroupOption = {
  label: string;
  options: TOption[];
};

export type PostTableData = Omit<
  TPostResponse,
  "__v" | "author" | "image" | "summary" | "content"
>;

export type Order = "asc" | "desc";

export type HeadCell =
  | {
      disablePadding: boolean;
      id: keyof PostTableData;
      label: string;
      numeric: boolean;
    }
  | string;
