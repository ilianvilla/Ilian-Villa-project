import React from 'react'
import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertyList/PropertyList';
import "./home.scss";
const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className="homeContainer">
        <Featured/>
        <PropertyList/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;
