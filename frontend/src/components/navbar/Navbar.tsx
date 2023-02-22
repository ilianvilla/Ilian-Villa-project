import React from 'react';
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
  navigate('/signup');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className="nav-container">
        <span className="logo">Division 5</span>
        <div className="nav-items">
            <button onClick={handleRegisterClick} className="nav-button">Register</button>
            <button onClick={handleLoginClick} className="nav-button">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
