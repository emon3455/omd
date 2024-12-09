import { apiSlice } from "../api/api";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    chargeCreditCard: builder.mutation({
      query: (data) => ({
        url: "/charge-credit-card",
        method: "POST",
        body: data,
      }),
    }),
    getAllPayments: builder.query({
      query: ({ page = 1, limit = 10, startDate, endDate, search }) => {
        let url = `/api/payment/getAllPayment?page=${page}&limit=${limit}&search=${search}`;
        if (startDate && endDate) {
          url += `&startDate=${startDate}&endDate=${endDate}`;
        }
        return { url, method: "GET" };
      },
    }),
    getSinglePayment: builder.query({
      query: (id) => ({
        url: `/api/payment/getSinglePayment/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useChargeCreditCardMutation,
  useGetAllPaymentsQuery,
  useGetSinglePaymentQuery,
} = paymentApiSlice;
