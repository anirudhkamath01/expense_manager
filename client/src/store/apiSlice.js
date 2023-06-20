import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URI for the API
const baseURI = "https://expense-tracker-erz6.onrender.com";

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
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: "/api/categories",
        method: "DELETE",
        body: categoryId, // Pass only the category ID
      }),
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
    updateTransaction: builder.mutation({
      query: (newTransaction) => {
        return {
          url: `/api/transaction`,
          method: "PUT",
          body: newTransaction,
        };
      },
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
    getUser: builder.query({
      query: (userId) => `/api/users/${userId}`,
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
  useDeleteCategoryMutation,
  useUpdateTransactionMutation,
  useGetUserQuery,
} = apiSlice;
