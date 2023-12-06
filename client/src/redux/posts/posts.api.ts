import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import { TPost, TPostsResponse, TSearchPostParams } from "./posts.type";
import { RootState } from "../index";
import { arrayToString } from "../utils/utils";

const postsAdapter = createEntityAdapter<TPost>({
  selectId: (post) => post._id,
});

const initialState = postsAdapter.getInitialState();

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<EntityState<TPost>, void>({
      query: () => ({
        url: "/posts",
      }),
      transformResponse: (responseData: TPostsResponse) => {
        const loadedPosts = responseData.posts.map((post) => {
          post.createdAt = new Date(post.createdAt);
          post.updatedAt = new Date(post.updatedAt);
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
    getFeaturedPosts: build.query<TPostsResponse, { featured: boolean }>({
      query: ({ featured }) => ({
        url: `/posts?featured=${featured}`,
      }),
      transformResponse: (responseData: TPostsResponse) => {
        let loadedPosts = responseData.posts;
        if (loadedPosts) {
          loadedPosts = responseData.posts.map((post) => {
            post.createdAt = new Date(post.createdAt);
            post.updatedAt = new Date(post.updatedAt);
            return post;
          });
        } else {
          loadedPosts = responseData.posts;
        }

        return { ...responseData, posts: loadedPosts };
      },
    }),
    searchPost: build.query<TPostsResponse, TSearchPostParams>({
      query: ({ q, tag, sort, page, limit }) => ({
        url: `/posts/search?q=${q}&tag=${arrayToString({
          arr: tag,
        })}&sort=${arrayToString({ arr: sort })}&page=${page}&limit=${limit}`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFeaturedPostsQuery,
  useLazySearchPostQuery,
} = postsApi;

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
