import React from 'react';
import './reservationCard.css';

type Reservation = {
    id: number;
    status: string;
    providerName: string;
    date: string;
    cost: number;
};

interface ReservationCardProps {
    reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
    return (
        <div className="reservation-card">
            <div className="reservation-details">
                <h3>{reservation.providerName}</h3>
                <p>Date: {reservation.date}</p>
                <p className="cost">Cost: {reservation.cost}</p>
            </div>
            <div className="reservation-cost">
                <img src="https://static.wixstatic.com/media/nsplsh_e146901c9b23447babcf72e12229a5a5~mv2.jpg" alt="Provider Image" className="provider-image"  />

            </div>
        </div>
    );
};

export default ReservationCard;
