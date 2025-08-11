import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * API service for handling test results using RTK Query
 */
export const resultApi = createApi({
  reducerPath: 'resultApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Result'],
  endpoints: (builder) => ({
    // Get all results
    getAllResults: builder.query({
      query: () => '/results',
      providesTags: ['Result']
    }),

    // Save new result
    saveResult: builder.mutation({
      query: (result) => ({
        url: '/results',
        method: 'POST',
        body: result
      }),
      invalidatesTags: ['Result']
    }),

    // Update existing result
    updateResult: builder.mutation({
      query: ({ resultId, ...result }) => ({
        url: `/results/${resultId}`,
        method: 'PUT',
        body: result
      }),
      invalidatesTags: ['Result']
    }),

    // Delete result
    deleteResult: builder.mutation({
      query: (resultId) => ({
        url: `/results/${resultId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Result']
    })
  })
});

// Export hooks for usage in components
export const {
  useGetAllResultsQuery,
  useSaveResultMutation,
  useUpdateResultMutation,
  useDeleteResultMutation
} = resultApi;