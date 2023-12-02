import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://raymart-personal-blog-api.onrender.com",
  }),
  tagTypes: ["Post", "Category", "Tag"],
  endpoints: () => ({}),
});
