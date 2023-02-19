import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { isNullishCoalesce } from "typescript";
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
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state = action.payload;
    },
  },
});

export const SelectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
