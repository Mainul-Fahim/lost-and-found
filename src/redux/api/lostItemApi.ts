import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const lostItemApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
       createLostItem: build.mutation({
          query: (data) => ({
             url: '/lost-items',
             method: 'POST',
             data,
          }),
          invalidatesTags: [tagTypes.lostItem],
       }),
 
       getAllLostCategories: build.query({
          query: () => ({
             url: '/lost-items-category',
             method: 'GET',
          }),
          providesTags: [tagTypes.lostItem],
       }),
 
       getMyLostItems: build.query({
         query: () => ({
            url: '/my-lostItems',
            method: 'GET',
         }),
         transformResponse: (response: any, meta: any) => {
            return {
               lostItems: response,
               meta,
            };
         },
         providesTags: [tagTypes.lostItem],
      }),
      
    }),
 });

 export const { useCreateLostItemMutation, useGetAllLostCategoriesQuery, useGetMyLostItemsQuery } = lostItemApi