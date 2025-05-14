import React from "react";
import PropTypes from "prop-types";
import "./Notifications.css";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  handleClick = () => console.log("Close button has been clicked");

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    return (
      <>
        <div className="notifications-title">
          <p>Your notifications</p>
        </div>

        {this.props.displayDrawer && (
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
              onClick={this.handleClick}
            >
              <img
                src={closeIcon}
                alt="close icon"
                style={{ height: "15px", width: "15px" }}
              />
            </button>

            {this.props.notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {this.props.notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      value={notif.value}
                      html={notif.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
};

export default Notifications;
