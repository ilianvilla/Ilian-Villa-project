import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './showUsers.scss';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

interface Booking {
  booking_id: any;
  id: number;
  startDate: any,
  endDate: any
};

const ShowBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        console.log(error);
        // Handle the error here
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
    <Header type={''}/>

      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map((booking: Booking) => (
  <tr key={booking.booking_id}>
    <td>{booking.startDate}</td>
    <td>{booking.endDate}</td>
    <td>
<Link to={`/booking/${booking.booking_id}/delete`}>
  <button>Delete</button>
</Link>
    </td>
  </tr>
))}
        </tbody>
      </table>
  </>
  );
};

export default ShowBookings;

