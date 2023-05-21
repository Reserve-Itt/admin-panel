import React, { useEffect, useState } from "react";
import "./reservation.css";
import ReservationCard from "../../components/reservationCard/reservationCard";
import {
  useGetOngiongReservationsQuery,
  useGetCompletedReservationsQuery,
  useGetCancelledReservationsQuery,
} from "../../services/ApiService/authApi";
import { IproviderReservations } from "../../types";
type Reservation = {
  id: number;
  status: string;
  providerName: string;
  date: string;
  cost: number;
};

const MyReservationsPage: React.FC = () => {
  const [activeReservations, setActiveReservations] = useState<
    IproviderReservations[]
  >([]);
  const [successReservations, setSuccessReservations] = useState<
    IproviderReservations[]
  >([]);
  const [cancelledReservations, setCancelledReservations] = useState<
    IproviderReservations[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("active");

  // Fetch reservations and update the corresponding state variables
  // You can replace this with your actual API call or mock data

  const {
    data: ongoingReservationsData,
    isLoading: ongoingReservationsLoading,
    isError: ongoingReservationsError,
    isSuccess: ongoingReservationsSuccess,
  } = useGetOngiongReservationsQuery({});

  // if ongoingReservationsSuccess is true, then we have the data
  useEffect(() => {
    if (ongoingReservationsData && ongoingReservationsData.reservations) {
      setActiveReservations(ongoingReservationsData.reservations);
    }
  }, [ongoingReservationsSuccess]);
  // if ongoing reservations is loading
  useEffect(() => {
    if (ongoingReservationsLoading) {
    }
  }, [ongoingReservationsLoading]);

  // if ongoing reservations has error
  useEffect(() => {
    if (ongoingReservationsError) {
      console.log("ongoing reservation errror" + ongoingReservationsError);
    }
  }, [ongoingReservationsError]);

  // get completed reservations
  const {
    data: completedReservationsData,
    isLoading: completedReservationsLoading,
    isError: completedReservationsError,
    isSuccess: completedReservationsSuccess,
  } = useGetCompletedReservationsQuery({});

  // if completedReservationsSuccess is true, then we have the data
  useEffect(() => {
    if (completedReservationsData && completedReservationsData.reservations) {
      setSuccessReservations(completedReservationsData.reservations);
    }
  }, [completedReservationsSuccess]);

  // if completed reservations is loading
  useEffect(() => {
    if (completedReservationsLoading) {
    }
  }, [completedReservationsLoading]);

  // if completed reservations has error
  useEffect(() => {
    if (completedReservationsError) {
      console.log("completed reservation errror" + completedReservationsError);
    }
  }, [completedReservationsError]);

  // get cancelled reservations

  const {
    data: cancelledReservationsData,
    isLoading: cancelledReservationsLoading,
    isError: cancelledReservationsError,
    isSuccess: cancelledReservationsSuccess,
  } = useGetCancelledReservationsQuery({});

  // if cancelledReservationsSuccess is true, then we have the data
  useEffect(() => {
    if (cancelledReservationsData && cancelledReservationsData.reservations) {
      setCancelledReservations(cancelledReservationsData.reservations);
    }
  }, [cancelledReservationsSuccess]);

  // if cancelled reservations is loading
  useEffect(() => {
    if (cancelledReservationsLoading) {
    }
  }, [cancelledReservationsLoading]);

  // if cancelled reservations has error
  useEffect(() => {
    if (cancelledReservationsError) {
      console.log("cancelled reservation errror" + cancelledReservationsError);
    }
  }, [cancelledReservationsError]);

  // Helper function to render the reservation list
  // Helper function to render the reservation list
  const renderReservationList = (reservations: IproviderReservations[]) => {
    if (reservations.length === 0) {
      return <p>No reservations found.</p>;
    }

    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <ReservationCard reservation={reservation} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="my-reservations-page">
      <div className="tab-buttons">
        <button
          className={activeTab === "active" ? "active" : ""}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={activeTab === "success" ? "active" : ""}
          onClick={() => setActiveTab("success")}
        >
          Success
        </button>
        <button
          className={activeTab === "cancelled" ? "active" : ""}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
      </div>
      <div className="reservation-list">
        {activeTab === "active" && renderReservationList(activeReservations)}
        {activeTab === "success" && renderReservationList(successReservations)}
        {activeTab === "cancelled" &&
          renderReservationList(cancelledReservations)}
      </div>
    </div>
  );
};

export default MyReservationsPage;
