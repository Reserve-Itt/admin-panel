import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

interface Advertisement {
    advertisementTitleText: string;
    advertisementDescriptionText: string;
    advertisementStartDate: string;
    advertisementEndDate: string;
    advertisement_image: File | null;
    advertisement_image_url: string;
}

const AddAdvertisement = () => {
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

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
        // add your API call or form submission logic here
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Add Advertisement
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="advertisementTitleText"
                    label="Advertisement Title"
                    value={advertisement.advertisementTitleText}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    name="advertisementDescriptionText"
                    label="Advertisement Description"
                    value={advertisement.advertisementDescriptionText}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />
                <TextField
                    name="advertisementStartDate"
                    label="Start Date"
                    type="date"
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
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <label htmlFor="advertisement_image">
                        <Button variant="contained" color="primary" component="span">
                            Choose Image
                        </Button>
                    </label>
                </div>
                {advertisement.advertisement_image_url && (
                    <div>
                        <img
                            src={advertisement.advertisement_image_url}
                            alt="Advertisement"
                            style={{ maxWidth: "100%", marginTop: "10px" }}
                        />
                    </div>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddAdvertisement;
