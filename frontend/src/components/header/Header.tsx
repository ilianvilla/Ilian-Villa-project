import { faBed, faCalendarDays, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import "./header.scss";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  type: string;
}

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/showRooms", {state:{date}})
    console.log(date)
  };

  return (
    <div className='header'>
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>Rooms</span>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rental</span>
              <FontAwesomeIcon icon={faBed} />
              <span>Hotels</span>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxis</span>
              </div>
              </div>
              <h1 className="headerTitle">Division5</h1>
              <p className="headerDescription">Random Description</p>
              <button className="headerButton">Sign In / Register</button>
              <div className="headerSearch">
                <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
                )}`}</span>
                {openDate && 
                <DateRange
                editableDateInputs={true}
                onChange={(newRange) => {
                 if (newRange.selection.startDate && newRange.selection.endDate) {
                 const range = {
                 startDate: newRange.selection.startDate,
                 endDate: newRange.selection.endDate,
                 key: "selection"
                 };
                setDate([range]);
               }
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className='date'
              />
              }
                
              <div className="headerSearchItem">
             <button className="headerButton" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

