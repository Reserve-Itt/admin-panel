import React from "react";
import "./AdvertisementCard.css";

interface AdvertisementCardProps {
    advertisementTitleText: string;
    advertisementDescriptionText: string;
    advertisementStartDate: string;
    advertisementEndDate: string;
    advertisementImageUrl: string;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
                                                                 advertisementTitleText,
                                                                 advertisementDescriptionText,
                                                                 advertisementStartDate,
                                                                 advertisementEndDate,
                                                                 advertisementImageUrl,
                                                             }) => {
    return (
        <div className="advertisementCard">
            <img className="image" src={advertisementImageUrl} alt="Advertisement" />
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
