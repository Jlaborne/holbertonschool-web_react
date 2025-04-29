import React from "react";

function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      <li
        data-notification-type={type}
        style={{ color: type === "urgent" ? "red" : "blue" }}
        dangerouslySetInnerHTML={{ __html: html }}
      ></li>
    );
  }

  return (
    <li
      data-notification-type={type}
      style={{ color: type === "urgent" ? "red" : "blue" }}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
