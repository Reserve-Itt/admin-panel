import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth, setUser } from "../../features/authSlice";
import { useLoginUserMutation } from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import "./Login.css";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AccountCircle, Password, PasswordOutlined } from "@mui/icons-material";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // email state
  const [email, setEmail] = useState("");
  // password state.
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // routing object.
  const appDispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector(SelectAuth);

  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(10),
    },
    input: {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(2),
      width: "25ch",
    },
  }));
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

  useEffect(() => {
    // controls the login process
    if (isLoginSuccess) {
      AppSuccesMessage("Login Successfully");
      // sets user data and writes it to browser.
      appDispatch(
        setUser({
          success: loginData.success,
          token: loginData.token,
          userData: loginData.user,
          isUserLoggedIn: true,
        })
      );
      console.log("loginData", loginData);
      navigate("/main");
      // navigate("/main");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      // if there is an error writes it to app message.
      let data: any = loginError;
      AppErrorMessage(data.data.message);
      console.log(data.data.message);
    }
  }, [isLoginError, loginError]);

  // handles the login
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginHandle();
    // Handle login logic here
  };


  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="welcome-header">Welcome</h1>
          {/*  <div>
            <label htmlFor="email">Email</label>
            <input
                placeholder="e-mail"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>*/}
          <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">E-mail</InputLabel>
            <Input
              id="input-with-icon-adornment"
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <div>
            {/* <label htmlFor="password">Password</label>
            <input
                placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField label="Password" type="password" className={classes.input}  value={password}
                       onChange={(e) => setPassword(e.target.value)} />*/}

            <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <button className="submit-button" type="submit">
            {isLoginLoading ? (
              <ClipLoader
                color={"red"}
                loading={true}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Login"
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
