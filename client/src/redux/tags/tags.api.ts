import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import { TTagsResponse } from "./tags.type";
import { RootState } from "../index";

const tagsAdapter = createEntityAdapter<TTagsResponse>({
  sortComparer: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
});

const initialState = tagsAdapter.getInitialState();

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (builds) => ({
    getTags: builds.query<EntityState<TTagsResponse>, void>({
      query: () => ({
        url: "/tags",
      }),
      transformResponse: (responseData: TTagsResponse[]) => {
        const loadedTags = responseData.map((tag) => {
          tag.id = tag._id;
          tag.createdAt = new Date(tag.createdAt);
          tag.updatedAt = new Date(tag.updatedAt);

          return tag;
        });

        return tagsAdapter.setAll(initialState, loadedTags);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Tag", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Tag" as const, id })),
          ];
        } else return [{ type: "Tag" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;

export const selecTagResult = tagsApi.endpoints.getTags.select();

const selectTagsData = createSelector(
  selecTagResult,
  (tagsResult) => tagsResult.data
);

export const {
  selectAll: selectAllTags,
  selectById: selectTagById,
  selectIds: selectTagIds,
} = tagsAdapter.getSelectors(
  (state: RootState) => selectTagsData(state) ?? initialState
);
