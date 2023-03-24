import authSlice from "./authSlice";
import emailSlice from "./emailSlice";
import forgotPassworddSlice from "./forgotPassworddSlice";
import { SelectAuth, setUser, logout } from "./authSlice";
import { selectEmail, setEmail } from "./emailSlice";
import {
  SelectForgotEmail,
  isForgotActivated,
  setIsForgotActivated,
} from "./forgotPassworddSlice";

export {
  authSlice,
  emailSlice,
  forgotPassworddSlice,
  SelectAuth,
  SelectForgotEmail,
  isForgotActivated,
  selectEmail,
  setUser,
  logout,
  setEmail,
  setIsForgotActivated,
};
