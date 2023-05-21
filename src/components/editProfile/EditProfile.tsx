import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles, Grid, Paper } from "@material-ui/core";
import { IProfile } from "../../types";
import { AppErrorMessage, AppSuccesMessage } from "../../services";
import { useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features";
import { useUpdateProviderMutation } from "../../services/ApiService/authApi";

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
    marginTop: theme.spacing(4),
    width: "80%",
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
  },
  field: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "20%",
    alignSelf: "center",
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "5px",
    padding: "10px",
    fontWeight: "bold",
    marginRight: theme.spacing(2),
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<IProfile>(profile);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsChanged(true);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    if (!userData?._id) return AppErrorMessage("User id not found!");
    if (selectedImage != null) {
      console.log("selectedImage exists");
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
        profile_image: selectedImage,
      });
    } else {
      console.log("selectedImage not exists");
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
    }
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
  useEffect(() => {
    if (selectedImage) {
      console.log("selectedImage: ", selectedImage);
    }
  }, [selectedImage]);
  return (
    <Paper className={classes.form}>
      {formData.profile_image_url && !previewImage && (
        <div>
          <img
            src={formData.profile_image_url}
            alt="Profile"
            style={{ width: 300, height: 300, borderRadius: "50%" }}
          />
        </div>
      )}
      {previewImage && (
        <div>
          <img
            src={previewImage}
            alt="Profile"
            style={{ width: 300, height: 300, borderRadius: "50%" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
              value={formData.reservationGranulity + " Minutes"}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/*"
              id="profile_image"
              name="profile_image"
              className={classes.inputText}
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profile_image">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.chooseImageButton}
              >
                Choose Image
              </Button>
            </label>
          </Grid>

          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditProfile;
