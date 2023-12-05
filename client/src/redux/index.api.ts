import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5500",
  }),
  tagTypes: ["Post", "Category", "Tag"],
  endpoints: () => ({}),
});
