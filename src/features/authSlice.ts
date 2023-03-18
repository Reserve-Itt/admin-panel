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
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.token,
          userData: action.payload.userData,
          isUserLoggedIn: action.payload.isUserLoggedIn,
          success: action.payload.success,
        })
      );
      state.token = action.payload.token;
      state.userData = action.payload.userData;
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
