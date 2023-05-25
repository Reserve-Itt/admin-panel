import React, { useEffect } from "react";
import "./AdvertisementCard.css";

interface AdvertisementCardProps {
  advertisementTitleText?: string;
  advertisementDescriptionText?: string;
  advertisementStartDate?: string;
  advertisementEndDate?: string;
  advertisement_image_url?: string;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  advertisementTitleText,
  advertisementDescriptionText,
  advertisementStartDate,
  advertisementEndDate,
  advertisement_image_url,
}) => {
  useEffect(() => {
    console.log("advertisementTitleText", advertisementTitleText);
    console.log("advertisementDescriptionText", advertisementDescriptionText);
    console.log("advertisementStartDate", advertisementStartDate);
    console.log("advertisementEndDate", advertisementEndDate);
  }, []);
  return (
    <div className="advertisementCard">
      <img
        className="image"
        src={advertisement_image_url}
        alt="Advertisement"
      />
      <h2 className="title">{advertisementTitleText}</h2>
      <p className="description">{advertisementDescriptionText}</p>
      <div className="date-range">
        <p className="date">{advertisementStartDate}</p>
        <span className="separator">-</span>
        <p className="date">{advertisementEndDate}</p>
      </div>
    </div>
  );
};

export default AdvertisementCard;
