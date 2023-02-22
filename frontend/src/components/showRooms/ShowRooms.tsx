import React, { useEffect, useState } from 'react';
import './showRooms.scss';
import axios from '../../api/Axios';
import { Card, Button, Col, Row } from 'react-bootstrap';

export interface Room {
  number: number;
  type: string;
  price: number;
  image: string;
  description: string;
  room_id: number;
  availability: string;
}

interface CalendarProps {
  dates: any;

}

// interface ShowRoomsProps {
//   dates: {
//     startDate: any;
//     endDate: any;
//   };
// }


const ShowRooms: React.FC<CalendarProps> = (props) => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  // alert(JSON.stringify(dates));
  const dates = props.dates;
  // alert(JSON.stringify(dates));
  const fetchRooms = async () => {
    try {
      const response = await axios.post('/showRooms', dates);
      setFilteredRooms(response.data);
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBooking = async (room: Room) => {
    console.log(room.availability);
    if (room.availability === 'Available' && dates.state.dates[0] && dates.state.dates[1]) {
      const userId = localStorage.getItem('user');
      try {
        const response = await axios.post('/createbooking', {
          user_id: userId,
          room_id: room.room_id,
          startDate: dates.state.dates[0],
          endDate: dates.state.dates[1],

        });
        // handle successful booking
        fetchRooms();
        console.log('Booking created:', response.data);
      } catch (error) {
        // handle failed booking
        console.log('Booking failed:', error);
      }
    }
  };

  return (
    <div className='total'>
      <div className="container">
        <h2>Rooms for the chosen dates, available and taken</h2>
        <Row xs={1} sm={2} md={3} lg={4}>
          {filteredRooms.map((room: Room) => (
            <Col key={room.room_id}>
              <Card style={{ margin: '10px' }}>
                <Card.Img variant="top" src={room.image} />
                <Card.Body>
                  <Card.Title>{room.type}</Card.Title>
                  <Card.Text>{room.description}</Card.Text>
                  <Button variant="primary" onClick={() => handleBooking(room)}>
                    {room.availability === 'Not Available' ? 'Booked' : 'Book'}
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{`Room ${room.number} - $${room.price}/night`}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ShowRooms;
