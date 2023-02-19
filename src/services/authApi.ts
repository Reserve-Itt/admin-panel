import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddService, IsignUpProvider } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reserve-it-backend-vtjraj6liq-ey.a.run.app/providers/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "login",
          method: "post",
          body,
        };
      },
    }),
    signUpUser: builder.mutation({
      query: (body: IsignUpProvider) => {
        return {
          url: "signup",
          method: "post",
          body,
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (body: { otp: number; email: string }) => {
        return {
          url: "verify_otp",
          method: "post",
          body,
        };
      },
    }),

    resendOtp: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "resend_otp",
          method: "post",
          body,
        };
      },
    }),

    addService: builder.mutation({
      query: (body: IAddService) => {
        return {
          url: "add_service",
          method: "post",
          body,
        };
      },
    }),

    listServices: builder.query({
      query: (id) => ({ url: `list_services?/${id}` }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useAddServiceMutation,
  useListServicesQuery,
} = authApi;
