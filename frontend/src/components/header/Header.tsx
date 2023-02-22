import React from 'react';
import "./header.scss";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

interface HeaderProps {
  type: string;
}

export const menu=[
  {
    title:'Users',
    link:'/users'
  },
  {
    title:'Rooms',
    link:'/rooms'
  },
  {
    title:'Bookings',
    link:'/bookings'
  },
];

const Header: React.FC<HeaderProps> = ({type}) => {
  const [activeItem, setActiveItem] = useState(type);

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>

        <ul className="list-unstyled components">
          {menu.map((val) => (
            <li 
              className={val.title === activeItem ? "active" : ""}
              onClick={() => setActiveItem(val.title)}
            >
              <Link 
                to={val.link}
              >
                {val.title}
              </Link>
            </li>
          ))}
     
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>

      <div id="content">
        <h2>Welcome to the Admin Dashboard!</h2>
        <p>Select a menu item to get started.</p>
      </div>
    </div>
  );
};

Header.defaultProps = {
  type: "Users",
};


export default Header;
