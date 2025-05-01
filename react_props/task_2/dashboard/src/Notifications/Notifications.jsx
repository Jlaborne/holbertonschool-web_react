import React from "react";
import "./Notifications.css";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";

function Notifications({ notifications = [] }) {
  const handleClick = () => console.log("Close button has been clicked");

  return (
    <div className="notifications">
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
        onClick={handleClick}
      >
        <img
          src={closeIcon}
          alt="close icon"
          style={{ height: "15px", width: "15px" }}
        />
      </button>

      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            type={notif.type}
            value={notif.value}
            html={notif.html}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
