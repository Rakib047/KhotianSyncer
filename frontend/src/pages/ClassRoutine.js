import React, { useState } from 'react';
import DayRow from '../components/routine/DayRow';
//import './Routine.css'; // Import local CSS file

const Routine = () => {
  const [routineData, setRoutineData] = useState([
    {
        name: 'Saturday',
        timeSlots: [
          { startTime: '08:00', endTime: '09:00', class: 'Chemistry' },
          { startTime: '09:00', endTime: '10:00', class: 'Math' },
          { startTime: '10:00', endTime: '11:00', class: 'Physics' },
          { startTime: '11:00', endTime: '12:00', class: 'Chemistry' },
          { startTime: '11:00', endTime: '12:00', class: 'Chemistry' },
          { startTime: '02:30', endTime: '05:00', class: 'Chemistry' },
        ],
      },
      {
        name: 'Sunday',
        timeSlots: [
          { startTime: '09:00', endTime: '10:00', class: 'Math' },
          { startTime: '10:00', endTime: '11:00', class: 'Physics' },
          { startTime: '11:00', endTime: '12:00', class: 'Chemistry' },
        ],
      },
      {
        name: 'Monday',
        timeSlots: [
          { startTime: '09:00', endTime: '10:00', class: 'Math' },
          { startTime: '10:00', endTime: '11:00', class: 'Physics' },
          { startTime: '11:00', endTime: '12:00', class: 'Chemistry' },
        ],
      },
    {
      name: 'Tuesday',
      timeSlots: [
        { startTime: '09:00', endTime: '10:00', class: 'Math' },
        { startTime: '10:00', endTime: '11:00', class: 'Physics' },
        { startTime: '11:00', endTime: '12:00', class: 'Chemistry' },
      ],
    },
    {
      name: 'Wednesday',
      timeSlots: [
        { startTime: '09:00', endTime: '10:00', class: 'English' },
        { startTime: '10:00', endTime: '11:00', class: 'History' },
      ],
    },
    // ... add more days as needed
  ]);

  return (
    <div className="routine-container">
      <h2 className="routine-title">Weekly Routine</h2>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Day</th>
            {routineData.length > 0 && (
              <th colSpan={routineData[0].timeSlots.length}>Time Slots</th>
            )}
          </tr>
          {routineData.length > 0 && (
            <tr>
              <th />
              {routineData[0].timeSlots.map((timeSlot, index) => (
                <th key={index}>{timeSlot.startTime} - {timeSlot.endTime}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {routineData.map((day, index) => (
            <DayRow key={index} day={day} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Routine;
