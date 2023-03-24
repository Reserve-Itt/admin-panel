import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { isNullishCoalesce } from "typescript";
import { RootState } from "../App/store";
import { IAuthState } from "../types";

const initialState: { email: string | undefined } = {
  email: undefined,
};

export const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<{ email: string }>) => {
      localStorage.setItem("email", JSON.stringify({ email: action.payload }));
      state.email = action.payload.email;
    },
  },
});

export const selectEmail = (state: RootState) => state.email;

export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
