import React from "react";
import PropTypes from "prop-types";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import { StyleSheet, css } from "aphrodite";

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  handleClick = () => console.log("Close button has been clicked");

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { displayDrawer, notifications } = this.props;

    return (
      <div className={css(styles.container)}>
        <div
          className={css(
            styles.menuItem,
            displayDrawer && styles.menuItemHidden
          )}
          onClick={this.props.handleDisplayDrawer}
        >
          <p>Your notifications</p>
        </div>

        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <div className={css(styles.panelHeader)}>
              <p>Here is the list of notifications</p>
              <button
                className={css(styles.closeButton)}
                aria-label="Close"
                onClick={this.handleClick}
              >
                <img
                  src={closeIcon}
                  alt="close icon"
                  className={css(styles.icon)}
                />
              </button>
            </div>

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <ul className={css(styles.ul)}>
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
            )}
          </div>
        )}
      </div>
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

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

const styles = StyleSheet.create({
  menuItem: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "10px",
    cursor: "pointer",
    zIndex: 2000,
  },

  menuItemHidden: {
    display: "none",
  },

  container: {
    position: "relative",
  },
  notifications: {
    position: "absolute",
    top: "40px",
    right: "10px",
    width: "350px",
    border: "2px dashed red",
    fontSize: "20px",
    backgroundColor: "#fff",
    zIndex: 1000,
    padding: "10px",

    "@media (max-width: 900px)": {
      width: "100vw",
      height: "100vh",
      top: "0",
      right: "0",
      left: "0",
      fontSize: "20px",
      padding: "20px",
      border: "none",
    },
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
  },
  icon: {
    width: "15px",
    height: "15px",
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
});

export default Notifications;
