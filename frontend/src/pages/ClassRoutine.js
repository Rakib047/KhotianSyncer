import React from 'react';

const ClassRoutine = () => {
  // Define the days and time slots
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
  const timeSlots = ['09.00-10.00', '10.00-11.00', '11.00-12.00', '12.00-01.00', '2.30-5.00'];

  return (
    <div className="routine-container">
      <h2 className="routine-title">Class Routine</h2>
      <table className="routine-table">
        <thead>
          <tr>
            <th></th> {/* Empty cell for the top-left corner */}
            {timeSlots.map((timeSlot, index) => (
              <th key={index}>{timeSlot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, rowIndex) => (
            <tr key={rowIndex}>
              <td>{day}</td>
              {timeSlots.map((timeSlot, colIndex) => (
                <td key={colIndex} className="has-class">
                  -{/* Placeholder for class information */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassRoutine;
