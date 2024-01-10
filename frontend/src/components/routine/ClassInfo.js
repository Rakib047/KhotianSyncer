import React from 'react';

const ClassInfo = ({ className }) => {
  return (
    <div>
      <h5>{className}</h5>
      {/* Additional class information like teacher or room can be added here */}
    </div>
  );
};

export default ClassInfo;
