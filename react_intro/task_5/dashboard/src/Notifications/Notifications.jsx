import React from "react";
import "./Notifications.css";
import closeIcon from "../assets/close-button.png";
import { getLatestNotification } from "../utils/utils";

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
}

export default Notifications;
