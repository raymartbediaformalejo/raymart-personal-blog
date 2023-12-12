import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import {
  TPostResponse,
  TPostResponseObject,
  TSearchPostParams,
  TPost,
  TPostId,
} from "./posts.type";
import { RootState } from "../index";
import { arrayToString, toEmptyStringIfNullish } from "../utils/utils";

const postsAdapter = createEntityAdapter<TPostResponse>({
  selectId: (post) => post._id,
});

const initialState = postsAdapter.getInitialState();

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<EntityState<TPostResponse>, void>({
      query: () => ({
        url: "/posts",
      }),
      transformResponse: (responseData: TPostResponseObject) => {
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
    getFeaturedPosts: build.query<TPostResponseObject, { featured: boolean }>({
      query: ({ featured }) => ({
        url: `/posts?featured=${featured}`,
      }),
      transformResponse: (responseData: TPostResponseObject) => {
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
    searchPost: build.query<TPostResponseObject, TSearchPostParams>({
      query: ({ q, tag, sort, page, limit }) => ({
        url: `/posts/search?q=${toEmptyStringIfNullish({
          item: q!,
        })}&tag=${arrayToString({
          arr: tag,
        })}&sort=${arrayToString({ arr: sort })}&page=${toEmptyStringIfNullish({
          item: page!,
        })}&limit=${toEmptyStringIfNullish({
          item: limit!,
        })}`,
      }),
    }),
    addNewPost: build.mutation<void, TPost>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: build.mutation<void, TPostResponse>({
      query: (initialNote) => ({
        url: "/posts",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Post", id: arg._id }],
    }),
    deletePost: build.mutation<void, TPostId>({
      query: ({ _id }) => ({
        url: `/posts`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Post", id: arg._id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFeaturedPostsQuery,
  useLazySearchPostQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
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
