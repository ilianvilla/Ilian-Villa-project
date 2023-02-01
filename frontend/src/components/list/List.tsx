import React from 'react';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import "./list.scss";

const List: React.FC = () => {
  return (
    <div>
      <Navbar/><Header type='list'/>
    </div>
  )
}

export default List;
