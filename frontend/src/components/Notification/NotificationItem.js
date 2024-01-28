import React from "react";

const NotificationItem = ({ actorName, type }) => {
  return (
    <>
      <li className="notification-item">
        <span className="actor-name">{actorName}</span> {type}
      </li>
      <hr className="notification-divider" />
    </>
  );
};

export default NotificationItem;
