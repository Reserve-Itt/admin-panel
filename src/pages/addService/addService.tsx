import React, { useEffect, useState } from "react";
import "./addService.css";

import { IAddService, IProviderService } from "../../types";
import Sidebar from "../Sidebar/Sidebar";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import {
  useAddServiceMutation,
  useListServicesQuery,
} from "../../services/ApiService/authApi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ListCard } from "../../components";
import { Button } from "@material-ui/core";
import Typography from "@mui/material/Typography";

interface Service {
  name: string;
  price: number;
  description: string;
  duration: number;
}

let services: Array<IProviderService> = [
  {
    serviceDescription: "123123",
    serviceDuration: 12,
    serviceName: "2131",
    servicePrice: 23,
  },
  {
    serviceDescription: "123",
    serviceDuration: 12,
    serviceName: "123",
    servicePrice: 123,
  },
  {
    serviceDescription: "123123",
    serviceDuration: 123,
    serviceName: "12314",
    servicePrice: 12312,
  },
];
// handles form change.
const AddService: React.FC = () => {
  const [service, setService] = useState<Service>({
    name: "",
    price: 0,
    description: "",
    duration: 0,
  });
  //const user = JSON.parse(localStorage.getItem("user") || "{}"); // controls the si
  const [openListServiceModal, setOpenListServiceModal] =
    useState<boolean>(false);
  const handleOpen = () => setOpenListServiceModal(true);
  const handleClose = () => setOpenListServiceModal(false);
  const { userData } = useAppSelector(SelectAuth);

  const [open, setOpen] = React.useState(false);
  const handleBigModalOpen = () => setOpen(true);
  const handleBigModalClose = () => setOpen(false);

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
  const { isUserLoggedIn } = useAppSelector(SelectAuth);
  const {
    data: userServicesListData,
    isSuccess: userServicesListISucess,
    isError: userServicesListIsError,
    error: userServicesListError,
    isLoading: userServicesListLoading,
  } = useListServicesQuery(
    { id: userData?._id != undefined ? userData._id.trim() : "" },
    { skip: !isUserLoggedIn }
  );
  useEffect(() => {
    if (userServicesListISucess) services = userServicesListData;
  }, [userServicesListData]);

  const test = () => {
    services.forEach((e) => {
      return <ListCard Data={e} />;
    });
  };

  return (
    <>
      <Sidebar />
      <div>
        <div className="buttonContainer">
        <Button style={{color: '#fff'}} onClick={handleBigModalOpen}>Add a New Service</Button>
      </div>
        <Modal
            open={open}
            onClose={handleBigModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <div className="modal-container">
            <button className="close-button" onClick={handleBigModalClose}>x</button>
            <div className="modal-content">
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
          </div>
        </Modal>
      </div>


      





    </>
  );
};

export default AddService;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};