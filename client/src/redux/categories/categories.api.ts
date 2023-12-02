import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";

import { baseApi } from "../index.api";
import { RootState } from "../index";
import { TCategoryResponse } from "./categories.type";

const categoryAdapter = createEntityAdapter<TCategoryResponse>({
  sortComparer: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
});

const initialState = categoryAdapter.getInitialState();

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builds) => ({
    getCategories: builds.query<EntityState<TCategoryResponse>, void>({
      query: () => ({
        url: "/categories",
      }),
      transformResponse: (responseData: TCategoryResponse[]) => {
        const loadedCategory = responseData.map((category) => {
          category.id = category._id;
          category.createdAt = new Date(category.createdAt);
          category.updatedAt = new Date(category.updatedAt);

          return category;
        });

        return categoryAdapter.setAll(initialState, loadedCategory);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Category", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Category" as const, id })),
          ];
        } else return [{ type: "Category" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;

export const selectCategoryResult =
  categoryApi.endpoints.getCategories.select();

const selectCategoryData = createSelector(
  selectCategoryResult,
  (tagsResult) => tagsResult.data
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors(
  (state: RootState) => selectCategoryData(state) ?? initialState
);
