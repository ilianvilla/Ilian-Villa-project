import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './showUsers.scss';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

interface Room {
  room_id: any,
  number: number,
  description: string,
  price: number,
  type: any
};

const AllRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/rooms');
        setRooms(response.data);
      } catch (error) {
        console.log(error);
        // Handle the error here
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
    <Header type={''}/>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Description</th>
            <th>Price</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {rooms.map((room: Room) => (
  <tr key={room.room_id}>
    <td>{room.number}</td>
    <td>{room.description}</td>
    <td>{room.price}</td>
    <td>{room.type}</td>
    <td>
    <Link to={`/room/${room.room_id}/edit`}>
  <button>Edit</button>
</Link>
<Link to={`/room/${room.room_id}/delete`}>
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

export default AllRooms;

