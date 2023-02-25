import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../App/store";

const initialState: { isForgotActivated: boolean | undefined } = {
  isForgotActivated: undefined,
};

export const isForgotActivated = createSlice({
  name: "isForgotActivated",
  initialState: initialState,
  reducers: {
    setIsForgotActivated: (
      state,
      action: PayloadAction<{ isForgotActivated: boolean }>
    ) => {
      localStorage.setItem("isForgotActivated", JSON.stringify(action.payload));
      state = action.payload;
    },
  },
});

export const SelectForgotEmail = (state: RootState) => state.forgotPassword;

export const { setIsForgotActivated } = isForgotActivated.actions;
export default isForgotActivated.reducer;
