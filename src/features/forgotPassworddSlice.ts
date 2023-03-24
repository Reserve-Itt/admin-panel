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
      localStorage.setItem(
        "isForgotActivated",
        JSON.stringify({ isForgotActivated: action.payload.isForgotActivated })
      );
      state.isForgotActivated = action.payload.isForgotActivated;
    },
  },
});

export const SelectForgotEmail = (state: RootState) => state.forgotPassword;

export const { setIsForgotActivated } = isForgotActivated.actions;
export default isForgotActivated.reducer;
