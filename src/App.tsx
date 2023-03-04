import * as React from "react";
import { useDispatch } from "react-redux";
import Beton from "./Beton";
import { setUser } from "./features/authSlice";
import Profile from "./pages/myProfile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Main, Signup } from "./pages";
import Navbar from "./NavBar/Navbar";
import AddService from "./pages/addService/addService";
import OTP from "./pages/sign-up/OTP";
import ConfirmPassword from "./pages/confirmPassword/confirmPassword";
import ForgotPassword from "./pages/ForgotPassword/forgotpassword";
import { toast, ToastContainer } from "react-toastify";
import { AppSuccesMessage } from "./services/toastService";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"; // required to show toastify messages.
export default function App() {
  const dispatch = useDispatch(); // redux state
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // controls the signup.
  const userDummy = {
    name: "Enes ",
    surname: "YARDIM",
    providerType: "Halısaha",
    profilePictureUrl: "https://via.placeholder.com/200x200",
  };
  const handleSubmit = (password: string) => {
    console.log(`Submitted password: ${password}`);
  };
  React.useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/profile" element={<Profile {...userDummy} />} />
          <Route path="/beton" element={<Beton />} />
          <Route path="/addService" element={<AddService />} />
        </Routes>
      </BrowserRouter>
      {/* container to control the toastify.  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
