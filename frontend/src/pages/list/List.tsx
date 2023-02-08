import React from 'react';
import { useState } from 'react';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import { DateRange } from 'react-date-range';
import "./list.scss";

interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }
const List: React.FC = () => {
    const [openDate] = useState(false)
    const [date, setDate] = useState<Range[]>([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      <div className="list-container">
        <div className="list-wrapper">
            <div className="list-search">
                <h1 className="list-title">Search</h1>
                <div className="list-item">
                    <label>Check-in Date</label>
                {openDate && (
                <DateRange
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
              )}
                </div>
                </div>
                <div className="list-result">
            </div>
        </div>
      </div>
    </div>
  );
};

export default List;

