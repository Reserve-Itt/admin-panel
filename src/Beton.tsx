import React, { useEffect } from "react";
import { useAppDispatch } from "./App/hooks";
import { setUser } from "./features/authSlice";
import { useGetUserQuery, useLoginUserMutation } from "./services/ApiService/authApi";
import { MuiThemeProvider } from "@material-ui/core";



type Props = {};
const obj = { email: "provider@gmail.com", password: "123456" };

const Beton = (props: Props) => {
  const appDispatch = useAppDispatch();

  // userlogin object
  const {
    data: loginData,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
    isLoading: isLoginLoading,
  } = useGetUserQuery({});

  // the component reason is here .
  // control the value if there is no error set the user that comes from api
  //
  let value = "";
  if (isLoginSuccess) {
    value = JSON.stringify(loginData);
    console.log(JSON.stringify(loginData));
    appDispatch(setUser(loginData));
  } else if (isLoginError) {
    value = JSON.stringify(loginError);
    console.log(loginError);
  } else if (isLoginLoading) value = "Loading...";

  // useEffect(() => {
  //   if (isLoginSuccess) {
  //     value = JSON.stringify(loginData);
  //     console.log(JSON.stringify(loginData));
  //   }
  // }, [isLoginSuccess]);

  // useEffect(() => {
  //   if (isLoginError) {
  //     value = JSON.stringify(loginError);
  //     console.log(JSON.stringify(loginError));
  //   }
  // }, [isLoginError]);

  return (
    <div>
      <button>logşin yap</button>
      <h1>{value}</h1>
    </div>
  );
};

export default Beton;
