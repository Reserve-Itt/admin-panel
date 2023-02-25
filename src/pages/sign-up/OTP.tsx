import React, { useState } from "react";
import "./otp.css";
import OtpInput from "react-otp-input";
import { useVerifyOtpMutation } from "../../services/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import { useNavigate } from "react-router";
import { setUser } from "../../features/authSlice";
import { useAppDispatch } from "../../App/hooks";
import { ClipLoader } from "react-spinners";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const appDispatch = useAppDispatch();

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

  const otpSendHandle = async () => {
    console.log("otp", otp);
    const email = JSON.parse(localStorage.getItem("email") || "{}"); // controls the signup.
    console.log("email", email);
    await sendOtp({ email: "betonnecmi06@gmail.com", otp_code: Number(otp) });
  };

  // if sucessfull redirect to otp page
  if (isOtpUpSuccess) {
    AppSuccesMessage("Sign Up SuccesFull");
    appDispatch(setUser(loginData));
    navigate("/profile");
    // if error show error in app message
  } else if (isOtpUpError) {
    console.log("🚀 ~ file: Signup.tsx:71 ~ isSignUpError", OtpUpError);
    let data: any = OtpUpError;
    // data status may change because we have two different error.
    // one type comes from nestJs and the other one comes from our rest api
    // the nest js comes with status code 400.
    if (data.status == 400) AppErrorMessage("bad request");
    else AppErrorMessage(data.data.message);
    // console.log(data.data.message);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    otpSendHandle();
  };

  const handleResend = () => {
    console.log("Resending OTP");
    setShowResend(false); // simulate OTP being resent
  };

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
          <p className="otp-resend">Didn't receive the code?  <a href="/">Resend Code</a></p>
        </form>
      </div>
    </div>
  );
};

export default Otp;
