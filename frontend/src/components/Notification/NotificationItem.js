import React from "react";

const NotificationItem = ({ actorName, type }) => {
  return (
    <>
      <li>
        {actorName} {type}
      </li>
      <hr className="notification-divider" />
    </>
  );
};

export default NotificationItem;
