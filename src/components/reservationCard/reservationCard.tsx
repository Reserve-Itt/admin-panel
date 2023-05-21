import React from "react";
import {
    IproviderReservations,
    IproviderReservationComment,
} from "../../types";
import logoImage from "../../images/whiteLogoRedBackground.jpg";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const ReservationCard: React.FC<{ reservation: IproviderReservations }> = ({
                                                                               reservation,
                                                                           }) => {
    const {
        reservationStartDate,
        reservationEndDate,
        reservationTime,
        reservationPrice,
        reservationServices,
        createdAt,
        isReservationFeedbackGiven,
        reservationComment,
    } = reservation;

    const formattedStartDate =
        reservationStartDate &&
        new Date(reservationStartDate).toLocaleString("en-US", {
            hour: "numeric",
            month: "short",
            year: "numeric",
        });

    const formattedEndDate =
        reservationEndDate &&
        new Date(reservationEndDate).toLocaleString("en-US", {
            hour: "numeric",
            month: "short",
            year: "numeric",
        });

    const formattedCreatedAt =
        createdAt &&
        new Date(createdAt).toLocaleString("en-US", {
            hour: "numeric",
            month: "short",
            year: "numeric",
        });

    const cardStyles = {
        display: "flex",
        flexDirection: "row" as FlexDirection | undefined,
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
    };

    const detailsStyles = {
        display: "flex",
        flexDirection: "column" as FlexDirection | undefined,
        flex: 1,
        paddingLeft: "40px",
    };

    const imageStyles = {
        maxWidth: "200px",
        marginRight: "40px",
    };

    const h3Styles = {
        marginTop: 0,
        marginBottom: "5px",
        fontSize: "1.2rem",
        fontWeight: "bold",
    };

    const pStyles = {
        marginTop: 6,
        marginBottom: "5px",
        fontSize: "1rem",
    };

    const costStyles = {
        fontWeight: "bold",
        fontSize: "1.2rem",
    };

    const dateStyles = {
        fontWeight: "bold",
        fontSize: "1.2rem",
        textAlign: "right" as "right",
    };

    const commentsStyles = {
        marginLeft: "40px",
        marginTop: "10px",
        padding: "10px",
        paddingLeft: "40px",

        borderLeft: "7px solid #d32f2f",
        borderRadius: "5px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
    };

    const commentsHeaderStyles = {
        marginTop: 0,
        marginBottom: "10px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#d32f2f", // Red color
    };

    const commentsTextStyles = {
        marginTop: 0,
        marginBottom: "5px",
        fontSize: "1rem",
        color: "#333", // Darker color
    };


    const headerStyle = {
     fontWeight: "bold",
    };
    const flexContainerStyles = {
        display: "flex",
        alignItems: "center",
        flex: 1,

    };


    return (
        <div style={cardStyles}>
            <div style={imageStyles}>
                <img src={logoImage} alt="Logo" style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={detailsStyles}>
                <h3 style={h3Styles}>{reservationServices?.join(", ")}</h3>
                <div style={flexContainerStyles}>
                    <p style={headerStyle}>Duration:&nbsp;&nbsp;</p>
                    <p style={pStyles}>{reservationTime} minutes</p>
                </div>
                <div style={flexContainerStyles}>
                    <p style={headerStyle}>Cost:&nbsp;&nbsp;</p>
                    <p>{reservationPrice} ₺</p>
                </div>
                <div style={flexContainerStyles}>
                    <p style={headerStyle}>Created At:&nbsp;&nbsp;</p>
                    <p style={pStyles}>{formattedCreatedAt}</p>
                </div>
            </div>
            <div style={dateStyles}>
                <div style={flexContainerStyles}>
                    <p style={headerStyle}>Start Date:&nbsp;&nbsp;</p>
                    <p style={pStyles}>{formattedStartDate}</p>
                </div>
                <div style={flexContainerStyles}>
                    <p style={headerStyle}>End Date:&nbsp;&nbsp;</p>
                    <p style={pStyles}>{formattedEndDate}</p>
                </div>
            </div>
            {isReservationFeedbackGiven && (
                <div style={commentsStyles}>
                    <h4 style={commentsHeaderStyles}>Reservation Comments:</h4>
                    {reservationComment?.map(
                        (comment: IproviderReservationComment, index: number) => (
                            <div key={index}>
                                <div style={flexContainerStyles}>       <p style={headerStyle}>Comment:&nbsp;&nbsp;</p>  <p style={commentsTextStyles}>{comment.comment}</p></div>
                                    <div style={flexContainerStyles}>       <p style={headerStyle}>Comment Rate:&nbsp;&nbsp;</p>  <p style={commentsTextStyles}> {comment.commentRate} </p></div>
                                        <div style={flexContainerStyles}>       <p style={headerStyle}>Commented At:&nbsp;&nbsp;</p>     <p style={commentsTextStyles}> {comment.commentedAt}</p></div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>


    );
};

export default ReservationCard;
