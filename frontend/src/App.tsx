import React from 'react';
import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Register from './components/register/Register';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Login from './components/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/showRooms" element={<List/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </BrowserRouter>  
  );
}

export default App;
