import React from 'react';
import TimeSlot from './TimeSlot';

const DayRow = ({ day }) => {
  return (
    <tr>
      <td>{day.name}</td>
      {day.timeSlots.map((timeSlot, index) => (
        <TimeSlot key={index} timeSlot={timeSlot} />
      ))}
    </tr>
  );
};

export default DayRow;
