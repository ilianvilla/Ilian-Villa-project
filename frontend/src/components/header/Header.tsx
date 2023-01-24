import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "./header.css";
const Header = () => {
  return (
    <div className='header'>
      <div className="headerList">
        <div className="headerListItem">
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>
      </div>
    </div>
  )
}

export default Header;
