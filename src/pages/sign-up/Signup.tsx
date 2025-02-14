import React, { useState, FC, useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { useSignUpUserMutation } from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services/toastService";
import { setUser } from "../../features/authSlice";
import { IsignUpProvider } from "../../types";
import { setEmail } from "../../features/emailSlice";
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
    notification_preference: "",
    reservationGranulity: "",
    workingStartTime: 0,
    workingEndTime: 0,
    longitude: 0,
    latitude: 0,
  });

  // navigation object.
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
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
    getlanglat(formData.adress);
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
      notification_preference: "BOTH",
      reservationGranulity: "60",
      workingStartTime: 9,
      workingEndTime: 21,
      location: {
        type: "Point",

        coordinates: [
          formData.longitude == 0 ? 32.85427 : formData.longitude,
          formData.latitude == 0 ? 39.925533 : formData.latitude,
        ],
      },
    });
  };

  // to get lang and lot from user.
  const getlanglat = (adress: string) => {
    const apiKey = "ad44dfd0e8df4aac9938ffdb9effbe18";
    let address = adress;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // log the entire response object
        if (
          data &&
          data.results &&
          data.results[0] &&
          data.results[0].geometry &&
          data.results[0].geometry.lat &&
          data.results[0].geometry.lng
        ) {
          let lat = data.results[0].geometry.lat;
          let lng = data.results[0].geometry.lng;
          setFormData({ ...formData, longitude: lng, latitude: lat });
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  };

  // if sucessfull redirect to otp page
  if (isSignUpSuccess) {
    AppSuccesMessage("Sign Up SuccesFull");
    appDispatch(setEmail({ email: formData.email }));
    navigate("/otp");

    // if error show error in app message
  }

  // if error show error in app message
  useEffect(() => {
    if (isSignUpError) {
      console.log("🚀 ~ file: Signup.tsx:71 ~ isSignUpError", signUpError);
      let data: any = signUpError;
      // data status may change because we have two different error.
      // one type comes from nestJs and the other one comes from our rest api
      // the nest js comes with status code 400.
      if (data.status == 400) AppErrorMessage("bad request");
      else AppErrorMessage(data.data.message);
      // console.log(data.data.message);
    }
  }, [isSignUpError, signUpError]);

  // handles submit when button clicked.
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.password == formData.confirmPassword) handleSignUp();
    else AppErrorMessage("the password and confirm password must be the same.");
  };
  return (
    <div className="main-container">
      <div className="signup-container">
        <div className="slogan-container">
          <h1>Welcome to Reserve-It</h1>
          <p>Make your reservation today and enjoy the best experiences</p>
        </div>
        <div className="form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="double-input">
              <div className="input-group">
                <input
                  placeholder="Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  placeholder="Owner Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <input
                placeholder="Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="double-input">
              <div className="input-group">
                <input
                  placeholder="Tax Number"
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <input
                placeholder="Address"
                type="text"
                name="adress"
                value={formData.adress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <select
                name="select"
                className="select"
                value={formData.select}
                onChange={handleChange}
                required
              >
                <option className="option placeholder" value="" disabled hidden>
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
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="double-input">
              <div className="input-group">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <button className="signup-button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
