import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export const CustomCalendar = ({ khotianList }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    // Ensure khotianList is not null or undefined before mapping
    if (khotianList && khotianList.length > 0) {
        
      // Extract dates from khotians and update the marked dates
      //console.log("here")
      const dates = khotianList.map((khotian) => new Date(khotian.date));
      //console.log(dates)
      setMarkedDates(dates);
    }
  }, [khotianList]);

  const getTileClassName = ({ date }) => {
    const isMarked = markedDates.some(markedDate =>
        date.getFullYear() === markedDate.getFullYear() &&
        date.getMonth() === markedDate.getMonth() &&
        date.getDate() === markedDate.getDate()
      );
      return isMarked ? 'markedDate' : '';
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={getTileClassName}
      />
    </div>
  );
};

export default CustomCalendar;
