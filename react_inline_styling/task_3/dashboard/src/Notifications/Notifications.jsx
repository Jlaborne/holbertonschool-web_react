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
        <div className={css(styles.title)}>
          <p>Your notifications</p>
        </div>

        {displayDrawer && (
          <div className={css(styles.notifications)}>
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

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
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
              </>
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
  container: {
    position: "relative",
  },
  title: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
  notifications: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
    zIndex: 1000,
    padding: "20px",
    fontSize: "20px",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "50px",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 1100,
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
