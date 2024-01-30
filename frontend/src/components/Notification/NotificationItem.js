import React from "react";

const NotificationItem = ({ actorName, type }) => {
  return (
    <div class="notification-item-container">
      <div className="notification-item">
        <span className="actor-name">{actorName}</span> {type}
      </div>
      <hr className="notification-divider" />
    </div>
  );
};

export default NotificationItem;
