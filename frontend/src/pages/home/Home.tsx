import React, { useState } from 'react'
import Calendar from '../../components/calendar/Calendar';
import ShowRooms from '../../components/showRooms/ShowRooms';
import useRoleRedirect from '../../hooks/CheckRole';
import "./home.scss";
const Home: React.FC = () => {
  const [dates,setDates]=useState('');
  const [openRooms,setOpen]=useState(false);
  useRoleRedirect();
  return (    
      <div className="home-container">
     
        <Calendar open={setOpen} changeDate={setDates} type={''}/>
       {openRooms ?  <ShowRooms dates={dates}/> : null}
      </div>
  )
}


export default Home;
