import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth, setUser } from "../../features";
import { useLoginUserMutation } from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
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
import { AccountCircle, Password } from "@mui/icons-material";
import { IAuthState } from "../../types";
import {LockOutlined} from "@material-ui/icons";
import logo from '../../assets/reserve_it_logo-removebg-preview.png';
import Typist from "react-typist";

interface LoginProps {}

function LoginTypist() {
  const [typistDone, setTypistDone] = useState(false);

  const handleTypingDone = () => {
    setTypistDone(true);
  };

  useEffect(() => {
    if (typistDone) {
      setTimeout(() => {
        setTypistDone(false);
      }, 1000);
    }
  }, [typistDone]);

  return (
      <Typist
          avgTypingDelay={50}
          onTypingDone={handleTypingDone}
          cursor={{ show: false }}
      >
        <span className="typist-wrapper">Hello Dear Customers!</span>
        <Typist.Backspace count={15} delay={1000} />
        <span className="typist-wrapper">, Reserve-It for your convenience!</span>
      </Typist>
  );
}

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
  makeStyles((theme) => ({
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
      console.log("loginData", loginData);

      let loginData2: IAuthState = loginData;
      if (!loginData2.userData) return;
      appDispatch(
        setUser({
          success: loginData.success,
          token: loginData.token,
          userData: {
            providerName: loginData2.userData.providerName,
            _id: loginData2.userData._id,
            role: loginData2.userData.role,
            createdAt: loginData2.userData.createdAt,
            updatedAt: loginData2.userData.updatedAt,
            description: loginData2.userData.description,
            tax_number: loginData2.userData.tax_number,
            phoneNumber: loginData2.userData.phoneNumber,
            address: loginData2.userData.address,
            __v: loginData2.userData.__v,
            fcmTokens: loginData2.userData.fcmTokens,
            isVerified: loginData2.userData.isVerified,
            ownerName: loginData2.userData.ownerName,
            providerType: loginData2.userData.providerType,
          },
          isUserLoggedIn: true,
        })
      );

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
          <div className="login-form2">
            <img src={logo} alt="Logo" style={{ height: "375px", width: "400px"}} />

            <LoginTypist />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <p className="login-text">Sign in to your account</p>
            <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
              <InputLabel
                  style={{ backgroundColor: "rgb(255,255,255)" }}
                  htmlFor="input-with-icon-adornment"
              >
                E-mail
              </InputLabel>
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
              <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
                <InputLabel
                    style={{ backgroundColor: "rgb(255,255,255)" }}
                    htmlFor="standard-adornment-password"
                >
                  Password
                </InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
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
            </div>
            <button className="submit-button" type="submit">
              {isLoginLoading ? (
                  <ClipLoader
                      color={"blue"}
                      loading={true}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
              ) : (
                  "Login"
              )}
            </button>
            <a href="/signup">Don't you have an account? Signup here.</a>
            <a href="/forgot-password">Forgot Password</a>
          </form>
        </div>
      </>
  );
};

export default Login;
