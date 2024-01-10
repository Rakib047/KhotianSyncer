import React from 'react';
import ClassInfo from './ClassInfo';

const TimeSlot = ({ timeSlot }) => {
  return (
    <td className={timeSlot.class ? 'table-success' : ''}>
      {timeSlot.class && <ClassInfo className={timeSlot.class} />}
    </td>
  );
};

export default TimeSlot;
