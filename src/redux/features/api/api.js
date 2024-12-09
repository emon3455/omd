/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../../constant/baseURL";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userSlice?.user?.token; // Adjust path based on state structure
      console.log("Token:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Authorization Header Set:", headers.get("Authorization"));
      } else {
        console.warn("No token found in state!");
      }

      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
