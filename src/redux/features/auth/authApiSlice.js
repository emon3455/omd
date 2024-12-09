import { apiSlice } from "../api/api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/changepassword",
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/update",
          method: "PATCH",
          body: data,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/forgetPassword",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/resetPasswords",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProfilePic: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/upload/image",
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateUserPlan: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/update-plan",
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
  useUpdateUserPlanMutation
} = authApiSlice;
