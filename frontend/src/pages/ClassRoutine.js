import React from "react";
import ClassCell from "../components/ClassCell";
const ClassRoutine = () => {
  // Define the days and time slots
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  const timeSlots = [
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-01:00",
    "2:30-5:00",
  ];

  return (
    <div>
      <h2 className="headings">
        <i class="fa-solid fa-address-card"></i> Routine
      </h2>

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
                <td>
                  <b>{day}</b>
                </td>
                {timeSlots.map((colIndex) => (
                  <td key={colIndex} className="has-class">
                    <ClassCell rowIndex={rowIndex} colIndex={colIndex}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassRoutine;
