import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a5bd-41-223-224-250.ngrok-free.app",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => `/booking`,
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),

    postAppointment: builder.mutation({
      query: (body) => ({
        url: `/appointments`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  usePostAppointmentMutation,
  useGetAppointmentsQuery,
} = apiSlice;

export default apiSlice;
