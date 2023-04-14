import React, { useState } from "react";
import "./addService.css";

import { IAddService } from "../../types";
import Sidebar from "../Sidebar/Sidebar";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import { useAddServiceMutation } from "../../services/ApiService/authApi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";

interface Service {
  name: string;
  price: number;
  description: string;
  duration: number;
}

// handles form change.
const AddService: React.FC = () => {
  const [service, setService] = useState<Service>({
    name: "",
    price: 0,
    description: "",
    duration: 0,
  });
  //const user = JSON.parse(localStorage.getItem("user") || "{}"); // controls the si

  const { userData } = useAppSelector(SelectAuth);

  // handles form change.
  const serviceAddHandle = async () => {
    console.log("userdata", userData);
    let data: IAddService = {
      providerId: userData?._id,
      services: {
        serviceDescription: service.description,
        serviceDuration: service.duration,
        serviceName: service.name,
        servicePrice: service.price,
      },
    };

    await addService(data);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(service); //
    serviceAddHandle(); // do
    // something with the service data
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const formatDuration = (duration: number) => {
    return `${duration} min`;
  };
  // userlogin object
  const [
    addService,
    {
      data: addServiceData,
      isSuccess: isAddServiceSuccess,
      isError: isAddServiceError,
      error: addServiceError,
      isLoading: isAddServiceLoading,
    },
  ] = useAddServiceMutation({});

  if (isAddServiceSuccess) {
    AppSuccesMessage("Add Service SuccesFull");
    // sets user data and writes it to browser.
    //appDispatch(setUser(loginData));
    // navigate("/main");
  } else if (isAddServiceError) {
    // if there is an error writes it to app message.
    let data: any = addServiceError;
    AppErrorMessage(data.data.message);
    console.log(data.data.message);
  }

  return (
    <>
      <Sidebar />
      <body className="body">
        <div className="add-service">
          <h1>Add Service</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={service.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <div className="input-group">
                <span className="input-group-addon">
                  {formatPrice(service.price)}
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={service.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={service.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration:</label>
              <div className="input-group">
                <span className="input-group-addon">
                  {formatDuration(service.duration)}
                </span>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={service.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="add-service-button" type="submit">
              Add Service
            </button>
          </form>
        </div>
      </body>
    </>
  );
};

export default AddService;
