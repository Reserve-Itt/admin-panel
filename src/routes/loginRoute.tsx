import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { setUser } from "../features/authSlice";
import { SelectAuth } from "../features/authSlice";

import { Login, Main, Signup } from "../pages";
import OTP from "../pages/sign-up/OTP";
import ForgotPassword from "../pages/ForgotPassword/forgotpassword";
import ConfirmPassword from "../pages/confirmPassword/confirmPassword";
import Profile from "../pages/myProfile/Profile";
import Beton from "../Beton";
import AddService from "../pages/addService/addService";
import NotFound from "../pages/notFoundPage/notFound";

const LoginRoute = () => {
  const { isUserLoggedIn } = useAppSelector(SelectAuth);

  useEffect(() => {}, [isUserLoggedIn]);
  const userDummy = {
    name: "Enes ",
    surname: "YARDIM",
    providerType: "Halısaha",
    profilePictureUrl: "https://via.placeholder.com/200x200",
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route
        path="/main"
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      >
        <Route path="main/profile" element={<Profile {...userDummy} />} />
        <Route path="main/beton" element={<Beton />} />
        <Route path="main/addService" element={<AddService />} />
      </Route>

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default LoginRoute;

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isUserLoggedIn } = useAppSelector(SelectAuth);
  // let auth = useAuth();
  let location = "/main";

  if (!isUserLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
