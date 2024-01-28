import React from "react";

const NotificationItem = ({ text }) => {
  return (
    <>
      <li>{text}</li>
      <hr className="notification-divider" />
    </>
  );
};

export default NotificationItem;
