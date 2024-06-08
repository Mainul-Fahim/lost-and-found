import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const foundItemApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      createFoundItem: build.mutation({
         query: (data) => ({
            url: '/found-items',
            method: 'POST',
            data,
         }),
         invalidatesTags: [tagTypes.foundItem],
      }),

      getAllFoundItems: build.query({
         query: () => ({
            url: '/found-items',
            method: 'GET',
         }),
         providesTags: [tagTypes.foundItem],
      }),

      getAllFoundCategories: build.query({
         query: () => ({
            url: '/found-items-category',
            method: 'GET',
         }),
         providesTags: [tagTypes.foundItem],
      }),

      getMyFoundItems: build.query({
         query: () => ({
            url: '/my-foundItems',
            method: 'GET',
         }),
         transformResponse: (response: any, meta: any) => {
            return {
               foundItems: response,
               meta,
            };
         },
         providesTags: [tagTypes.foundItem],
      }),

      deleteFoundItem: build.mutation({
         query: (id) => ({
            url: `/found-items/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: [tagTypes.foundItem],
      }),

   }),
});

export const { useCreateFoundItemMutation, useGetAllFoundCategoriesQuery, useGetAllFoundItemsQuery, useGetMyFoundItemsQuery, useDeleteFoundItemMutation } = foundItemApi