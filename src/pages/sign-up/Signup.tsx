import React, { useState, FC } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { useSignUpUserMutation } from "../../services/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import { setUser } from "../../features/authSlice";
import { IsignUpProvider } from "../../types";
interface IProps {}

const Signup: FC<IProps> = () => {
  // form object to handle form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    select: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
    taxNumber: "",
    phoneNumber: "",
    adress: "",
  });

  // navigation object.
  const appDispatch = useAppDispatch();

  // userlogin object
  const [
    signUpUser,
    {
      data: signUpData,
      isSuccess: isSignUpSuccess,
      isError: isSignUpError,
      error: signUpError,
      isLoading: isSignUpLoading,
      status: signUpStatus,
    },
  ] = useSignUpUserMutation({});

  // handles change in form sets the state and re render the page accordingly.
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to handle signup.
  const handleSignUp = async () => {
    await signUpUser({
      address: formData.adress,
      description: formData.description,
      email: formData.email,
      ownerName: formData.lastName,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      providerName: formData.firstName,
      providerType: formData.select,
      role: "provider",
      tax_number: formData.taxNumber,
    });
  };

  // todo this can be changed to useEffect if there is to much render.
  // if sucessfull redirect to otp page
  if (isSignUpSuccess) {
    AppSuccesMessage("Sign Up SuccesFull");
    // TODO: navigate to otp code.
    // navigate("/main");
    // if error show error in app message
  } else if (isSignUpError) {
    console.log("🚀 ~ file: Signup.tsx:71 ~ isSignUpError", signUpError);
    let data: any = signUpError;
    // data status may change because we have two different error.
    // one type comes from nestJs and the other one comes from our rest api
    // the nest js comes with status code 400.
    if (data.status == 400) AppErrorMessage("bad request");
    else AppErrorMessage(data.data.message);
    // console.log(data.data.message);
  }

  // handles submit when button clicked.
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.password == formData.confirmPassword) handleSignUp();
    else AppErrorMessage("the password and confirm password must be the same.");
  };
  return (
    <body className="main-container">
      <div className="signup-container">
        <div className="slogan-container">
          <h1>Welcome to Reserve-It</h1>
          <p>Make your reservation today and enjoy the best experiences</p>
        </div>
        <div className="form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="firstName">Provider Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Owner Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="taxNumber">Tax Number</label>
              <input
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="adress">Adress</label>
              <input
                type="text"
                name="adress"
                value={formData.adress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="gender"> Select Provider Type</label>
              <select
                name="select"
                className="select"
                value={formData.select}
                onChange={handleChange}
                required
              >
                <option className="option" value="">
                  Select Provider Type
                </option>
                <option className="option" value="FOOTBALL">
                  Football pitch owner
                </option>
                <option className="option" value="HAIRDRESSER">
                  Hairdresser
                </option>
                <option className="option" value="INDIVIDUAL">
                  Individual
                </option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </body>
  );
};

export default Signup;
