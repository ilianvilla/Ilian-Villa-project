import React from 'react';
import "./navbar.scss";
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-container">
        <span className="logo">Division 5</span>
        <div className="nav-items">
            <button className="nav-button">Register</button>
            <button className="nav-button">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
