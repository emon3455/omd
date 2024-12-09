import { apiSlice } from "../api/api";

export const rxvaletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Member login
    rxvaletLogin: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/login",
        method: "POST",
        body: data,
      }),
    }),
    // Member enrollment
    enrollment: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/enrollment",
        method: "POST",
        body: data,
      }),
    }),
    // Update member
    updateMember: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/update-member",
        method: "POST",
        body: data,
      }),
    }),
    // Add dependent
    addDependent: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/add-dependent",
        method: "POST",
        body: data,
      }),
    }),
    // Update dependent
    updateDependent: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/update-dependent",
        method: "POST",
        body: data,
      }),
    }),
    // Activate or deactivate member
    memberActivateOrDeactivate: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/member-activate-deactivate",
        method: "POST",
        body: data,
      }),
    }),
    // Change member plan
    memberChangePlan: builder.mutation({
      query: (data) => ({
        url: "/api/rxvalet/member-change-plan",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useEnrollmentMutation,
  useUpdateMemberMutation,
  useAddDependentMutation,
  useUpdateDependentMutation,
  useMemberActivateOrDeactivateMutation,
  useMemberChangePlanMutation,
  useRxvaletLoginMutation
} = rxvaletApiSlice;
