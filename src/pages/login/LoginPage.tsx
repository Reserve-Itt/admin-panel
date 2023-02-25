import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../App/hooks";
import { setUser } from "../../features/authSlice";
import { useLoginUserMutation } from "../../services/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import "./Login.css";
import { ClipLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // email state
  const [email, setEmail] = useState("");
  // password state.
  const [password, setPassword] = useState("");

  // routing object.
  const appDispatch = useAppDispatch();

  // userlogin object
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginUserMutation({});

  // handles form change.
  const loginHandle = async () => {
    await loginUser({ email: email, password: password });
  };
  const navigate = useNavigate();

  // controls the login process
  if (isLoginSuccess) {
    AppSuccesMessage("Login SuccesFull");
    // sets user data and writes it to browser.
    appDispatch(setUser(loginData));
    // navigate("/main");
  } else if (isLoginError) {
    // if there is an error writes it to app message.
    let data: any = loginError;
    AppErrorMessage(data.data.message);
    console.log(data.data.message);
  }

  // handles the login
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginHandle();
    // Handle login logic here
  };

  // when login succes object changes controls it and redirects accordingly.
  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/main");
    }
  }, [isLoginSuccess]);

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            {isLoginLoading ? (
              <ClipLoader
                color={"red"}
                loading={true}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Log in"
            )}
          </button>
          <a href="/signup">Signup</a>
          <a href="/forgot-password">Forgot Password</a>
        </form>
      </div>
    </>
  );
};

export default Login;
