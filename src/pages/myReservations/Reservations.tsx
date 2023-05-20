import React, {useEffect, useState} from 'react';
import './reservation.css';
import ReservationCard from "../../components/reservationCard/reservationCard";
type Reservation = {
    id: number;
    status: string;
    providerName: string;
    date: string;
    cost: number;

};

const MyReservationsPage: React.FC = () => {
    const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
    const [successReservations, setSuccessReservations] = useState<Reservation[]>([]);
    const [cancelledReservations, setCancelledReservations] = useState<Reservation[]>([]);
    const [activeTab, setActiveTab] = useState<string>('active');

    // Fetch reservations and update the corresponding state variables
    // You can replace this with your actual API call or mock data
    const fetchReservations = () => {
        // Mock data for demonstration
        const reservations: Reservation[] = [
            {
                id: 1,
                providerName: 'tedu halisaha',
                date: '2023-05-20',
                cost: 50,
                status: 'active',
            },
            {
                id: 2,
                providerName: 'ABC Sports Center',
                date: '2023-05-21',
                cost: 75,
                status: 'success',
            },
            {
                id: 3,
                providerName: 'XYZ Sports Club',
                date: '2023-05-22',
                cost: 60,
                status: 'cancelled',
            },
            {
                id: 4,
                providerName: 'Sports Arena',
                date: '2023-05-23',
                cost: 55,
                status: 'active',
            },
        ];

        setActiveReservations(reservations.filter(reservation => reservation.status === 'active'));
        setSuccessReservations(reservations.filter(reservation => reservation.status === 'success'));
        setCancelledReservations(reservations.filter(reservation => reservation.status === 'cancelled'));
    };

    // Call fetchReservations when the component mounts
    useEffect(() => {
        fetchReservations();
    }, []);

    // Helper function to render the reservation list
    // Helper function to render the reservation list
    const renderReservationList = (reservations: Reservation[]) => {
        if (reservations.length === 0) {
            return <p>No reservations found.</p>;
        }

        return (
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        <ReservationCard reservation={reservation} />
                    </li>
                ))}
            </ul>
        );
    };


    return (
        <div className="my-reservations-page">
            <h2>My Reservations</h2>
            <div className="tab-buttons">
                <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>
                    Active
                </button>
                <button className={activeTab === 'success' ? 'active' : ''} onClick={() => setActiveTab('success')}>
                    Success
                </button>
                <button className={activeTab === 'cancelled' ? 'active' : ''} onClick={() => setActiveTab('cancelled')}>
                    Cancelled
                </button>
            </div>
            <div className="reservation-list">
                {activeTab === 'active' && renderReservationList(activeReservations)}
                {activeTab === 'success' && renderReservationList(successReservations)}
                {activeTab === 'cancelled' && renderReservationList(cancelledReservations)}
            </div>
        </div>
    );
};

export default MyReservationsPage;
