import React from 'react'
import Featured from '../../components/featured/Featured';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import "./home.scss";
const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className="homeContainer">
        <Featured/>
      </div>
    </div>
  )
}

export default Home;
