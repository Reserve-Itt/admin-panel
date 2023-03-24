import { Navigate, Outlet, Route, Router, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import { useAppSelector } from "../App/hooks";
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
import { log } from "console";

const LoginRoute = () => {
  const userDummy = {
    name: "Enes ",
    surname: "YARDIM",
    providerType: "Halısaha",
    profilePictureUrl: "https://via.placeholder.com/200x200",
  };

  let val = false;

  const { isUserLoggedIn } = useAppSelector(SelectAuth);
  val = isUserLoggedIn ? true : false;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/not-found" element={<NotFound />} />

      <Route path="/main" element={val ? <Main /> : <Login />} />
      <Route
        path="/main"
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      > </Route>
        <Route path="main/profile" element={<Profile {...userDummy} />} />
        <Route path="main/beton" element={<Beton />} />
        <Route path="main/addService" element={<AddService />} />


      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default LoginRoute;
