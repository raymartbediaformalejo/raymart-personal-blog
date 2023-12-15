import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { RootState } from "./index";

// baseUrl: "http://localhost:5500",
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5500",
  // baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data }));
      api.dispatch({
        payload: refreshResult.data,
        type: "auth/setCredentials",
      });

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        // @ts-expect-error: Unreachable code error
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Category", "Tag"],
  endpoints: () => ({}),
});
