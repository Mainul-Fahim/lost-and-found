import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const claimApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
       createClaim: build.mutation({
          query: (data) => ({
             url: '/claims',
             method: 'POST',
             data,
          }),
          invalidatesTags: [tagTypes.claimItem],
       }),

       getMyClaimItems: build.query({
         query: () => ({
            url: '/my-claimItems',
            method: 'GET',
         }),
         transformResponse: (response: any, meta: any) => {
            return {
               claimItems: response,
               meta,
            };
         },
         providesTags: [tagTypes.claimItem],
      }),

      updateClaimStatus: build.mutation({
         query: (data) => {
            console.log(data);
            return {
               url: `/claims/${data.id}`,
               method: 'PUT',
               data: {status:data.body},
            };
         },
         invalidatesTags: [tagTypes.claimItem],
      }),
      
    }),
 });

 export const { useCreateClaimMutation, useGetMyClaimItemsQuery, useUpdateClaimStatusMutation } = claimApi