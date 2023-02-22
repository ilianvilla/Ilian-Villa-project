import React, { useState } from 'react';
import axios from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './calendar.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SHOWROOMS_URL = '/showRooms';

interface CalendarProps {
  open(arg0: boolean): unknown;
  changeDate: any;
  type: string;
}

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const change=props.changeDate;



  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const startDate = format(date[0].startDate, 'yyyy-MM-dd');
    const endDate = format(date[0].endDate, 'yyyy-MM-dd');
    try {
      const response = await axios.post(SHOWROOMS_URL, { startDate, endDate });
      console.log(response);
      if (response.status === 200) {
        props.open(true);
        setOpenDate(false);
        change({ state: { dates: [startDate, endDate]   } });
      }
    } catch (err) {
      // Handle errors herezz
      console.log(err);
    }
  };


  return (
    <>
      <div className="header-search">
        <div className="header-search-item">
          <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="header-search-text"
          >{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
            date[0].endDate,
            'MM/dd/yyyy'
          )}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(newRange) => {
                if (
                  newRange.selection.startDate &&
                  newRange.selection.endDate
                ) {
                  const range = {
                    startDate: newRange.selection.startDate,
                    endDate: newRange.selection.endDate,
                    key: 'selection',
                  };
                  setDate([range]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
            />
          )}
          <div className="header-search-item">
            <button className="header-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
