import { Navigate, Outlet, Route, Router, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import { useAppSelector } from "../App/hooks";

import { SelectAuth } from "../features/authSlice";
import Beton from "../Beton";
import {
  AddService,
  ConfirmPassword,
  ForgotPassword,
  Login,
  Main,
  NotFound,
  Profile,
  Sidebar,
  Signup,
  Otp,
} from "../pages";
const LoginRoute: React.FC = () => {
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
      <Route path="/OTP" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/main" element={val ? <Main /> : <Login />} />
      <Route
        path="/profile"
        element={val ? <Profile {...userDummy} /> : <Login />}
      />
      <Route path="/beton" element={val ? <Beton /> : <Login />} />
      <Route path="/addService" element={val ? <AddService /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default LoginRoute;
