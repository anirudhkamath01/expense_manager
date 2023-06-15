import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URI for the API
const baseURI = "http://localhost:8080";

// Create the API slice using createApi
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // Define the API endpoints here
    getCategories: builder.query({
      query: () => "/api/categories",
      provideTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/api/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    getLabels: builder.query({
      query: () => "/api/labels",
      provideTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (recordID) => ({
        url: "/api/transaction",
        method: "DELETE",
        body: recordID,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

// Export the generated hooks for each API endpoint
export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useAddCategoryMutation,
} = apiSlice;
