import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../../constant/baseURL";

const dependentApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL, // Replace with your actual base URL
  }),
  endpoints: (builder) => ({
    addDependent: builder.mutation({
      query: (dependentData) => ({
        url: "/api/dependent/add",
        method: "POST",
        body: dependentData,
      }),
    }),
    updateDependent: builder.mutation({
      query: (dependentData) => ({
        url: `/api/dependent/update`,
        method: "PUT",
        body: dependentData,
      }),
    }),
    updateDependentProfilePic: builder.mutation({
      query: (dependentData) => ({
        url: "/api/dependent/upload/image",
        method: "PUT",
        body: dependentData,
      }),
    }),
  }),
});

export const {
  useAddDependentMutation,
  useUpdateDependentProfilePicMutation,
  useUpdateDependentMutation,
} = dependentApiSlice;
export default dependentApiSlice;
