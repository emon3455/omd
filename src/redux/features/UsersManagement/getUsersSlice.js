import { apiSlice } from "../api/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch users with pagination
    fetchAllUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/api/auth/users?page=${page}&limit=${limit}&search=${search}`, // Endpoint with pagination parameters
    }),
    // PATCH: Update user status
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/api/auth/update-status/${userId}`, // Endpoint with dynamic userId
        method: "PATCH",
        body: { status }, // Payload containing the new status
        headers: {
          "Content-Type": "application/json", // Ensure JSON data is sent
        },
      }),
    }),
    // PATCH: Update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/api/auth/manage-role/${userId}`, // Endpoint with dynamic userId
        method: "PATCH",
        body: { role }, // Payload containing the new role
        headers: {
          "Content-Type": "application/json", // Ensure JSON data is sent
        },
      }),
    }),
  }),
});

// Export the generated hooks
export const {
  useFetchAllUsersQuery, // Hook for fetching users
  useUpdateUserStatusMutation, // Hook for updating user status
  useUpdateUserRoleMutation, // Hook for updating user role
} = usersApiSlice;
