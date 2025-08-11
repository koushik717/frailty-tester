import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const exercisesApi = createApi({
  reducerPath: 'exercisesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Exercise'],
  endpoints: (builder) => ({
    // Get exercises by category
    getExercisesByCategory: builder.query({
      query: (category) => `/exercises/${category}`,
      providesTags: ['Exercise']
    })
  })
});

export const {
  useGetExercisesByCategoryQuery
} = exercisesApi;