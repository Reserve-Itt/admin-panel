import * as React from "react";
import { Navbar, Sidebar } from "./pages/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectAuth, setUser } from "./features/authSlice";
import { useAppDispatch, useAppSelector } from "./App/hooks";
import { LoginRoute } from "./routes";

export default function App() {
  const dispatch = useAppDispatch(); // redux state
  const { isUserLoggedIn } = useAppSelector(SelectAuth); // redux state

  React.useEffect(() => {
    console.log("isUserLıoggesinapp", isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <>
      {/* {isUserLoggedIn && <Navbar />} */}
      {isUserLoggedIn && <Sidebar />}
      <LoginRoute />

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
