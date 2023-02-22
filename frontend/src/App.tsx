import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Register from './components/register/Register';
import Home from './pages/home/Home';
import Login from './components/login/Login';
import AdminDashboard from './components/admindashboard/AdminDashboard';
import UserDashboard from './components/userDashboard/UserDashboard';
import ShowRooms from '../src/components/showRooms/ShowRooms'
import ShowUsers from './components/showUsers/ShowUsers';
import ShowBookings from './components/showBookings/ShowBookings';
import AllRooms from './components/allRooms/AllRooms';
import EditUser from './components/editUser/EditUser';

axios.defaults.baseURL = 'http://localhost:1000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/showRooms" element={<ShowRooms dates={undefined} />}/>
        <Route path="/users" element={<ShowUsers />} />
        <Route path="/bookings" element={<ShowBookings />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/user/:id/edit" element={<EditUser />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
