import React from "react";
import PropTypes from "prop-types";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import { StyleSheet, css } from "aphrodite";

class Notifications extends React.Component {
  handleClick = () => console.log("Close button has been clicked");

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { displayDrawer, notifications } = this.props;

    return (
      <>
        <div className={css(styles.notificationsTitle)}>
          <p>Your notifications</p>
        </div>

        {displayDrawer && (
          <div className={css(styles.notificationsPanel)}>
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

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notif) => (
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

const styles = StyleSheet.create({
  notificationsTitle: {
    padding: "10px",
  },
  notificationsPanel: {
    border: "2px dashed red",
    padding: "10px",
    position: "relative",
  },
});

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

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
