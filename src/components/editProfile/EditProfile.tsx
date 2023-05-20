import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles, Grid } from "@material-ui/core";
import { IProfile } from "../../types";
import { useUpdateProviderMutation } from "../../services/ApiService/authApi";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import { useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";

interface EditProfileProps {
  profile: IProfile;
  onSave: (profile: IProfile) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
    marginTop: "130px",
    width: "80%",
    backgroundColor: "white",
  },
  field: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "40%",
    alignSelf: "center",
    marginRight: theme.spacing(1),
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "5px",
    padding: "10px",
    fontWeight: "bold",
    border: "none",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#388e3c",
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
  previewImage: {
    maxWidth: "60%",
    marginTop: theme.spacing(2),
  },
  chooseImageButton: {
    marginTop: theme.spacing(2),
    color: "#fff",
    backgroundColor: "#007aff",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5),
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#0062cc",
    },
  },
}));

const EditProfile: React.FC<EditProfileProps> = ({ profile, onSave }) => {
  const { userData } = useAppSelector(SelectAuth);

  const [isChanged, setIsChanged] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState<IProfile>(profile);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsChanged(true);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      /*     setAdvertisement((prevState) => ({
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
            reader.readAsDataURL(file);*/
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsChanged(false);
    console.log("Operation cancelled.");
  };

  const handleProfileUpdate = async () => {
    await UpdateProvider({
      providerName: formData.providerName,
      ownerName: formData.ownerName,
      description: formData.description,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      workingStartTime: formData.workingStartTime,
      workingEndTime: formData.workingEndTime,
      reservationGranulity: formData.reservationGranulity,
      id: userData?._id,
    });
  };

  const [
    UpdateProvider,
    {
      data: providerData,
      isSuccess: providerDataIsSuccess,
      isError: providerDataIsError,
      error: providerDataError,
      isLoading: providerDataIsLoading,
    },
  ] = useUpdateProviderMutation({});

  useEffect(() => {
    if (providerDataIsSuccess) {
      AppSuccesMessage("Profile updated successfully!");
      console.log("providerData: ", providerData);
    }
  }, [providerDataIsSuccess]);
  useEffect(() => {
    if (providerDataIsError) AppErrorMessage(providerDataError?.toString());
  }, [providerDataIsError]);

  useEffect(() => {}, [providerDataIsLoading]);

  return (
    <body>
    <img src="https://static.wixstatic.com/media/nsplsh_e146901c9b23447babcf72e12229a5a5~mv2.jpg" alt="Description of the image" width="300" height="200"/>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="providerName"
              label="Provider Name"
              className={classes.field}
              value={formData.providerName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="ownerName"
              label="Owner Name"
              className={classes.field}
              value={formData.ownerName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="description"
              label="Description"
              className={classes.field}
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="address"
              label="Address"
              className={classes.field}
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              className={classes.field}
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="workingStartTime"
              label="work starts at"
              placeholder="mm:hh"
              className={classes.field}
              value={formData.workingStartTime}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="workingEndTime"
              label="Work ends at"
              placeholder="mm:hh"
              className={classes.field}
              value={formData.workingEndTime}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="reservationGranulity"
              label="Reservation Granulity"
              placeholder="30 minutes"
              className={classes.field}
              value={formData.reservationGranulity}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid>
            {/* <div>
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
            </div> */}
            {/*{advertisement.advertisement_image_url && (
        <div>
            <img
                src={advertisement.advertisement_image_url}
                alt="Advertisement"
                className={classes.previewImage}
            />
        </div>
    )}*/}
          </Grid>
        </Grid>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleProfileUpdate}
          >
            Save
          </Button>

          <Button
            type="button"
            variant="contained"
            color="default"
            className={classes.button}
            onClick={handleCancel}
            disabled={!isChanged}
          >
            Cancel
          </Button>
        </div>
      </form>
    </body>
  );
};

export default EditProfile;
