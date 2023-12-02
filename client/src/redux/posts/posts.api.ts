import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import { TPostsResponse } from "./posts.type";
import { RootState } from "..";

const postsAdapter = createEntityAdapter<TPostsResponse>({
  sortComparer: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
});

const initialState = postsAdapter.getInitialState();

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<EntityState<TPostsResponse>, void>({
      query: () => ({
        url: "/posts",
      }),
      transformResponse: (responseData: TPostsResponse[]) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          // Ensure createdAt is a Date object
          post.createdAt = new Date(post.createdAt);
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post" as const, id })),
          ];
        } else return [{ type: "Post" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;

export const selectPostResult = postsApi.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state: RootState) => selectPostsData(state) ?? initialState
);
