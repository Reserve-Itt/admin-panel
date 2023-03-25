import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddAdvertisement,
  IAddService,
  IAuthState,
  IsignUpProvider,
} from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reserve-it-backend-vtjraj6liq-ey.a.run.app/providers/",
    prepareHeaders: (headers) => {
      const user: IAuthState = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
      query: (body: { otp_code: number; email: string }) => {
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

    forgotPassword: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "forgot_password",
          method: "post",
          body,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "reset_password",
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

    getUser: builder.query({
      query: () => {
        return {
          url: "me",
        };
      },
    }),

    getProviderServices: builder.mutation({
      query: (body: { id: string }) => {
        return {
          url: "list_services",
          method: "post",
          body,
        };
      },
    }),

    listServices: builder.query({
      query: (id) => ({ url: `list_services?/${id}` }),
    }),

    addAdvertisement: builder.mutation({
      query: (body: IAddAdvertisement) => {
        return {
          url: "add_advertisement",
          method: "post",
          body,
        };
      },
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useGetProviderServicesMutation,
  useAddAdvertisementMutation,
} = authApi;
