import React, { FC, useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAddAdvertisementMutation } from "../../services/ApiService/authApi";
import { useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import { IAddAdvertisement } from "../../types";
import { Sidebar } from "../Sidebar";

interface Advertisement {
  advertisementTitleText: string;
  advertisementDescriptionText: string;
  advertisementStartDate: string;
  advertisementEndDate: string;
  advertisement_image: File | null;
  advertisement_image_url: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100vh",
  },

  form: {
    marginLeft: 300,
    width: "60%",
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form2: {
    width: "40%",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: "#d3272f",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  fancyText: {
    fontFamily: "cursive",
    fontSize: "3rem",
    fontWeight: "bold",
    textShadow: "2px 2px #000",
    color: "#fff",
    textAlign: "center",
  },

  chooseImageButton: {
    marginTop: theme.spacing(2),
    color: "#fff",
    backgroundColor: "#d3272f",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ff3300",
    },
  },
  previewImage: {
    maxWidth: "250px",
    maxHeight: "250px",
    marginTop: theme.spacing(2),
  },
  submitButton: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: "#fff",
    backgroundColor: "#d3272f",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ff3300",
    },
  },
  inputText: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%",
    transition: "all 0.3s ease-in-out",
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 5px ${theme.palette.primary.main}`,
    },
  },
}));

const AddAdvertisement: FC = () => {
  const [
    addAdvertisement,
    {
      data: addAdvertDAta,
      isSuccess: isAddingSuccess,
      isError: isAddingError,
      error: AddingError,
      isLoading: isAddingLoading,
    },
  ] = useAddAdvertisementMutation({});

  const { userData } = useAppSelector(SelectAuth);
  console.log("userDataAdd", userData);

  const handleClick = async () => {
    let data: IAddAdvertisement = {
      providerId: userData?._id,
      advertisementTitleText: advertisement.advertisementTitleText,
      advertisementDescriptionText: advertisement.advertisementDescriptionText,
      advertisementStartDate: advertisement.advertisementStartDate,
      advertisementEndDate: advertisement.advertisementEndDate,
      advertisement_image: advertisement.advertisement_image,
    };
    if (data.advertisement_image == null) {
      AppErrorMessage("Please select an image");
      return;
    }

    await addAdvertisement(data);
  };

  useEffect(() => {
    if (isAddingSuccess) AppSuccesMessage("Advertisement Added Successfully");
  }, [isAddingSuccess]);

  useEffect(() => {
    if (isAddingError) {
      let data: any = AddingError;
      AppErrorMessage(data.data.message);
      console.log(data.data.message);
    }
  }, [isAddingError, isAddingError]);

  const classes = useStyles();
  const [advertisement, setAdvertisement] = useState<Advertisement>({
    advertisementTitleText: "",
    advertisementDescriptionText: "",
    advertisementStartDate: "",
    advertisementEndDate: "",
    advertisement_image: null,
    advertisement_image_url: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAdvertisement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAdvertisement((prevState) => ({
        ...prevState,
        advertisement_image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setAdvertisement((prevState) => ({
          ...prevState,
          advertisement_image_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(advertisement);
  };

  const imageUrl = `https://picsum.photos/seed/${userData?.providerType}/750/800`;
  console.log("imageUrl", imageUrl);
  return (
    <>
      <Sidebar />
      <div>
        <div className={classes.container}>
          <Box className={classes.form}>
            <Typography variant="h4" gutterBottom>
              Add Advertisement
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="advertisementTitleText"
                label="Advertisement Title"
                className={classes.inputText}
                value={advertisement.advertisementTitleText}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="advertisementDescriptionText"
                label="Advertisement Description"
                className={classes.inputText}
                value={advertisement.advertisementDescriptionText}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="advertisementStartDate"
                label="Start Date"
                type="date"
                className={classes.inputText}
                value={advertisement.advertisementStartDate}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="advertisementEndDate"
                label="End Date"
                type="date"
                className={classes.inputText}
                value={advertisement.advertisementEndDate}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <div>
                <input
                  accept="image/*"
                  id="advertisement_image"
                  name="advertisement_image"
                  className={classes.inputText}
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="advertisement_image">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className={classes.chooseImageButton}
                  >
                    Choose Image
                  </Button>
                </label>
              </div>
              {advertisement.advertisement_image_url && (
                <div>
                  <img
                    src={advertisement.advertisement_image_url}
                    alt="Advertisement"
                    className={classes.previewImage}
                  />
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submitButton}
                onClick={handleClick}
              >
                Submit
              </Button>
            </form>
          </Box>
          <Box
            className={classes.form2}
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <Typography variant="h6" className={classes.fancyText}>
              Unleash Your Brand's Potential with Powerful Advertising!
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddAdvertisement;
