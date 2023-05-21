import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddAdvertisement,
  IAddService,
  IAuthState,
  IProfile,
  IProviderUpdateRequest,
  IsignUpProvider,
} from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reserve-it-backend-vtjraj6liq-ey.a.run.app/",
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
          url: "providers/login",
          method: "post",
          body,
        };
      },
    }),
    signUpUser: builder.mutation({
      query: (body: IsignUpProvider) => {
        return {
          url: "providers/signup",
          method: "post",
          body,
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (body: { otp_code: number; email: string }) => {
        return {
          url: "providers/verify_otp",
          method: "post",
          body,
        };
      },
    }),

    resendOtp: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "providers/resend_otp",
          method: "post",
          body,
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "providers/forgot_password",
          method: "post",
          body,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "providers/reset_password",
          method: "post",
          body,
        };
      },
    }),
    addService: builder.mutation({
      query: (body: IAddService) => {
        return {
          url: "providers/add_service",
          method: "post",
          body,
        };
      },
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: "providers/me",
        };
      },
    }),

    listServices: builder.query({
      query: (id: string) => {
        return {
          url: "providers/list_services?id=" + id,
        };
      },
    }),
    UpdateProvider: builder.mutation({
      query: (body: IProviderUpdateRequest) => {
        const formData = new FormData();
        if (body.address) {
          formData.append("address", body.address);
        }
        if (body.description) {
          formData.append("description", body.description);
        }
        if (body.ownerName) {
          formData.append("ownerName", body.ownerName);
        }
        if (body.phoneNumber) {
          formData.append("phoneNumber", body.phoneNumber);
        }
        if (body.providerName) {
          formData.append("providerName", body.providerName);
        }
        if (body.reservationGranulity) {
          formData.append("reservationGranulity", body.reservationGranulity);
        }
        if (body.workingStartTime) {
          formData.append("workingStartTime", body.workingStartTime.toString());
        }
        if (body.workingEndTime) {
          formData.append("workingEndTime", body.workingEndTime.toString());
        }
        if (body.id) {
          formData.append("id", body.id);
        }
        if (body.profile_image) {
          formData.append("profile_image", body.profile_image);
        }

        return {
          url: "providers/update",
          method: "PATCH",
          body: formData,
        };
      },
    }),
    listComments: builder.query({
      query: (id) => `providers/list_comments?id=${id.id.toString()}`,
    }),

    getStatistics: builder.query({
      query: () => `reservation/list/statistics/provider`,
    }),

    getMyAdvertisements: builder.query({
      query: () => `providers/list/advertisements/me`,
    }),

    getOngiongReservations: builder.query({
      query: () => `reservation/list/provider/ongoing`,
    }),
    getCompletedReservations: builder.query({
      query: () => `reservation/list/provider/completed`,
    }),

    getCancelledReservations: builder.query({
      query: () => `reservation/list/provider/cancelled`,
    }),

    addAdvertisement: builder.mutation({
      query: (advertisement: IAddAdvertisement) => {
        const formData = new FormData();
        if (advertisement.providerId) {
          formData.append("providerId", advertisement.providerId);
        }
        if (advertisement.advertisementTitleText) {
          formData.append(
            "advertisementTitleText",
            advertisement.advertisementTitleText
          );
        }
        if (advertisement.advertisementDescriptionText) {
          formData.append(
            "advertisementDescriptionText",
            advertisement.advertisementDescriptionText
          );
        }
        if (advertisement.advertisementStartDate) {
          formData.append(
            "advertisementStartDate",
            advertisement.advertisementStartDate
          );
        }
        if (advertisement.advertisementEndDate) {
          formData.append(
            "advertisementEndDate",
            advertisement.advertisementEndDate
          );
        }
        if (advertisement.advertisement_image) {
          formData.append(
            "advertisement_image",
            advertisement.advertisement_image
          );
        }
        if (advertisement.advertisement_image_url) {
          formData.append(
            "advertisement_image_url",
            advertisement.advertisement_image_url
          );
        }
        return {
          url: "providers/add_advertisement",
          method: "POST",
          body: formData,
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
  useAddAdvertisementMutation,
  useLazyListServicesQuery,
  useUpdateProviderMutation,
  useListCommentsQuery,
  useGetStatisticsQuery,
  useGetMyAdvertisementsQuery,
  useGetOngiongReservationsQuery,
  useGetCompletedReservationsQuery,
  useGetCancelledReservationsQuery,
} = authApi;
