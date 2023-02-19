import * as React from "react";
import { useDispatch } from "react-redux";
import Beton from "./Beton";
import { setUser } from "./features/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Main, Signup } from "./pages";
import { toast, ToastContainer } from "react-toastify";
import { AppSuccesMessage } from "./services/toastService";
import "react-toastify/dist/ReactToastify.css"; // required to show toastify messages.
export default function App() {
  const dispatch = useDispatch(); // redux state
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // controls the signup.

  React.useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
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
