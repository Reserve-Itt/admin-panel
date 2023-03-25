import React, { useState } from "react";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../App/hooks";
import { setEmail } from "../../features/emailSlice";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import { setIsForgotActivated } from "../../features/forgotPassworddSlice";
import { useForgotPasswordMutation } from "../../services/ApiService/authApi";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import {styled} from "@mui/material";
import {blue} from "@mui/material/colors";

const ForgotPassword : React.FC = ()=> {
  const [email, setLocalEmail] = useState("");
  const navigate = useNavigate();
  // main slice usage
  const appDispatch = useAppDispatch();

  const [
    forgotPassword,
    {
      isSuccess: isForgotSuccess,
      isError: isForgotError,
      error: forgotError,
      isLoading: isForgotLoading,
      status: forgotStatus,
    },
  ] = useForgotPasswordMutation({});

  const forgothandler = async () => {
    await forgotPassword({ email: email });
  };

  if (isForgotSuccess) {
    appDispatch(setEmail({ email: email }));
    navigate("/otp");
    AppSuccesMessage("forgot operation succesfull");
    appDispatch(setIsForgotActivated({ isForgotActivated: true }));
  } else if (isForgotError) {
    let data: any = forgotError;
    // data status may change because we have two different error.
    // one type comes from nestJs and the other one comes from our rest api
    // the nest js comes with status code 400.
    if (data.status == 400) AppErrorMessage("bad request");
    else AppErrorMessage(data.data.message);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    forgothandler();
    // Add code to submit email and send password reset link
  };
  const BlueReportGmailerrorred = styled(ReportGmailerrorredIcon)({
    color: blue[500],
    fontSize: 60,
  });
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">

          <BlueReportGmailerrorred />

        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setLocalEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Reset Password
            </button>
          </div>
        </form>
        <div className="form-group">
          <p className="forgot-password-text">
            Remembered your password? <a href="/">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
