import React from "react";
import {
  IproviderReservations,
  IproviderReservationComment,
} from "../../types";

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
    flexDirection: "column" as FlexDirection | undefined,
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
  };

  const h3Styles = {
    marginTop: 0,
    marginBottom: "5px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  const pStyles = {
    marginTop: 0,
    marginBottom: "5px",
    fontSize: "1rem",
  };

  const costStyles = {
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const commentsStyles = {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
  };

  const commentsHeaderStyles = {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  const commentsTextStyles = {
    marginTop: 0,
    marginBottom: "5px",
    fontSize: "1rem",
  };

  return (
    <div style={cardStyles}>
      <div style={detailsStyles}>
        <h3 style={h3Styles}>{reservationServices?.join(", ")}</h3>
        <div>
          <p style={pStyles}>Start Date: {formattedStartDate}</p>
          <p style={pStyles}>End Date: {formattedEndDate}</p>
        </div>
        <p style={pStyles}>Time: {reservationTime}</p>
        <p style={costStyles}>Cost: {reservationPrice}</p>
        <p style={pStyles}>Created At: {formattedCreatedAt}</p>
        {isReservationFeedbackGiven && (
          <div style={commentsStyles}>
            <h4 style={commentsHeaderStyles}>Reservation Comments:</h4>
            {reservationComment?.map(
              (comment: IproviderReservationComment, index: number) => (
                <div key={index}>
                  <p style={commentsTextStyles}>Comment: {comment.comment}</p>
                  <p style={commentsTextStyles}>
                    Comment Rate: {comment.commentRate}
                  </p>
                  <p style={commentsTextStyles}>
                    Commented At: {comment.commentedAt}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
