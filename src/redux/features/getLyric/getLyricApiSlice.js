import { apiSlice } from "../api/api";

export const getLyricApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Member login
    getLyricLogin: builder.mutation({
      query: (data) => ({
        url: "/api/getLyric/login",
        method: "POST",
        body: data,
      }),
    }),
    
  }),
});

export const {
  useGetLyricLoginMutation
} = getLyricApiSlice;
