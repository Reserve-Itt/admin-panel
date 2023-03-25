import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { IAuthState } from "../types";

const initialState: IAuthState = {
  token: undefined,
  success: undefined,
  userData: {
    __v: undefined,
    _id: undefined,
    address: undefined,
    createdAt: undefined,
    description: undefined,
    email: undefined,
    fcmTokens: undefined,
    isVerified: undefined,
  },
  isUserLoggedIn: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      if (action.payload.userData) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: action.payload.token,
            userData: {
              __v: action.payload.userData.__v,
              _id: action.payload.userData._id,
              address: action.payload.userData.address,
              createdAt: action.payload.userData.createdAt,
              description: action.payload.userData.description,
              email: action.payload.userData.email,
              fcmTokens: action.payload.userData.fcmTokens,
              isVerified: action.payload.userData.isVerified,
            },
            isUserLoggedIn: action.payload.isUserLoggedIn,
            success: action.payload.success,
          })
        );
      }

      state.token = action.payload.token;
      if (action.payload.userData) {
        state.userData = {
          __v: action.payload.userData.__v,
          _id: action.payload.userData._id,
          address: action.payload.userData.address,
          createdAt: action.payload.userData.createdAt,
          description: action.payload.userData.description,
          email: action.payload.userData.email,
          fcmTokens: action.payload.userData.fcmTokens,
          isVerified: action.payload.userData.isVerified,
        };
      }

      state.isUserLoggedIn = action.payload.isUserLoggedIn;
      state.success = action.payload.success;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = undefined;
      state.userData = undefined;
      state.isUserLoggedIn = undefined;
      state.success = undefined;
    },
  },
});

export const SelectAuth = (state: RootState) => state.auth;
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
