import React, { useEffect, useState } from "react";
import "./otp.css";
import OtpInput from "react-otp-input";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import { useNavigate } from "react-router";
import { SelectAuth, setUser } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { ClipLoader } from "react-spinners";
import { setIsForgotActivated } from "../../features/forgotPassworddSlice";
import { error } from "console";
import { SelectForgotEmail, selectEmail } from "../../features";

const Otp: React.FC = () => {
  // otp state
  const [otp, setOtp] = useState("");

  // resend button visiblity controller
  const [showResend, setShowResend] = useState(false);

  // routing control
  const navigate = useNavigate();

  // otp updater
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  // main slice usage
  const appDispatch = useAppDispatch();

  // send otp mutation
  const [
    sendOtp,
    {
      data: loginData,
      isSuccess: isOtpUpSuccess,
      isError: isOtpUpError,
      error: OtpUpError,
      isLoading: isOtpUpLoading,
      status: OtpUpStatus,
    },
  ] = useVerifyOtpMutation({});

  // resend otp mutation
  const [
    resendOtp,
    {
      isSuccess: isResendScuccess,
      isError: isResendError,
      error: resendError,
      isLoading: isResendLoading,
      status: resendStatus,
    },
  ] = useResendOtpMutation({});
  // const email: { email: string } = JSON.parse(
  //   localStorage.getItem("email") || "{}"
  // );
  // const isForgotActivated: { isForgotActivated: boolean } = JSON.parse(
  //   localStorage.getItem("isForgotActivated") || "{}"
  // );
  const { email } = useAppSelector(selectEmail);
  const { isForgotActivated } = useAppSelector(SelectForgotEmail);
  // otp verification handler
  const otpSendHandle = async () => {
    console.log("email", email);
    if (email) await sendOtp({ email: email, otp_code: Number(otp) });
  };
  // resend otp handler rtk
  const otpResendHandle = async () => {
    if (email) await resendOtp({ email: email });
  };

  //? otp verification function result handler
  // if sucessfull redirect to otp page

  useEffect(() => {
    if (isOtpUpSuccess) {
      AppSuccesMessage("Verification SuccesFull");
      appDispatch(setUser(loginData));
      console.log("isForgotActivated", isForgotActivated);
      if (isForgotActivated) {
        navigate("/confirm-password");
        appDispatch(setIsForgotActivated({ isForgotActivated: false }));
      } else {
        navigate("/profile");
      }
      // if error show error in app message
    }
  }, [isOtpUpSuccess]);

  // otp submitr main handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    otpSendHandle();
  };

  // resent main otp handler
  const handleResend = () => {
    console.log("Resending OTP");
    setShowResend(false); // simulate OTP being resent
    otpResendHandle();
  };

  //? otp resend  function result handler
  // if sucessfull redirect to otp page
  if (isResendScuccess) {
    AppSuccesMessage(" Validation SuccesFull");
  }

  // resend otp error handler
  useEffect(() => {
    if (isResendError) {
      let data: any = OtpUpError;
      // data status may change because we have two different error.
      // one type comes from nestJs and the other one comes from our rest api
      // the nest js comes with status code 400.
      if (data.status == 400) AppErrorMessage("bad request");
      if (isOtpUpError) {
        let data: any = OtpUpError;
        // data status may change because we have two different error.
        // one type comes from nestJs and the other one comes from our rest api
        // the nest js comes with status code 400.
        if (data.status == 400) AppErrorMessage("bad request");
        else AppErrorMessage(data.data.message);
        // console.log(data.data.message);
      } else AppErrorMessage(data.data.message);
    }
  }, [isResendError, resendError, isOtpUpError, OtpUpError]);

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h1 className="otp-title">Verify Your Email Code</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="otp-header">Please enter the OTP code</h2>
          <OtpInput
            className="react-otp-input-container"
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            separator={<span>&nbsp;&bull;&nbsp;</span>}
            isInputNum={true}
            shouldAutoFocus={true}
            isInputSecure={false}
          />
          {showResend ? (
            <p className="otp-instructions">
              Didn't receive OTP?{" "}
              <button className="otp-link" onClick={handleResend}>
                Resend OTP
              </button>
            </p>
          ) : (
            <p className="otp-instructions">
              OTP has been sent to your email. Please check your inbox and enter
              the code.
            </p>
          )}

          <button type="submit" className="otp-button" title="Send">
            {isOtpUpLoading ? (
              <ClipLoader
                color={"red"}
                loading={true}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Verify Code"
            )}
          </button>
          <p className="otp-resend">
            Didn't receive the code? <a href="/">Resend Code</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Otp;
