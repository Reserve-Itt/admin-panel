import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { useResetPasswordMutation } from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import "./confirmPassword.css";
import { emailSlice, selectEmail } from "../../features";

const ConfirmPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  // main slice usage
  const appDispatch = useAppDispatch();
  const [
    resetPassword,
    {
      isSuccess: isResetSuccess,
      isError: isResetError,
      error: resetError,
      isLoading: isResetLoading,
      status: restStatus,
    },
  ] = useResetPasswordMutation({});

  // const email: { email: string } = JSON.parse(
  //   localStorage.getItem("email") || "{}"
  // );

  const { email } = useAppSelector(selectEmail);

  const resetPasswordHandler = async () => {
    resetPassword({ email: email ? email : "", password: password });
  };

  useEffect(() => {
    if (isResetSuccess) {
      navigate("/login");
      AppSuccesMessage("reseting password succesfull");
    } else if (isResetError) {
      let data: any = resetError;
      // data status may change because we have two different error.
      // one type comes from nestJs and the other one comes from our rest api
      // the nest js comes with status code 400.
      if (data.status == 400) AppErrorMessage("bad request");
      else AppErrorMessage(data.data.message);
    }
  }, [isResetSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      resetPasswordHandler();
    } else {
      AppErrorMessage("Passwords do not match");
    }
    if (password === confirmPassword && password.length > 5) {
      resetPasswordHandler();
    } else {
      AppErrorMessage("Password length must be longer than five character.");
      // Passwords do not match, display error message
    }
  };

  return (
    <div className="confirm-password">
      <div className="confirm-password-container">
        <div className="confirm-password-slogan">Secure Your Account</div>
        <div className="confirm-password-box">
          <form onSubmit={handleSubmit}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button type="submit">
              {isResetLoading ? (
                <ClipLoader
                  color={"red"}
                  loading={true}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
