import React from "react";
import PropTypes from "prop-types";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import { StyleSheet, css } from "aphrodite";

class Notifications extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const {
      displayDrawer,
      notifications,
      handleDisplayDrawer,
      handleHideDrawer,
    } = this.props;

    return (
      <>
        {!displayDrawer && (
          <div
            data-testid="menu-item"
            onClick={handleDisplayDrawer}
            style={{
              textAlign: "right",
              padding: "10px",
              cursor: "pointer",
              ":hover": {
                animationName: [opacityAnim, bounceAnim],
                animationDuration: "1s, 0.5s",
                animationIterationCount: "3",
              },
            }}
          >
            Your notifications
          </div>
        )}

        {displayDrawer && (
          <div
            data-testid="notifications-panel"
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
              width: "350px",
              border: "2px dashed red",
              fontSize: "15px",
              backgroundColor: "#fff",
              zIndex: 1000,
              padding: "10px",
              boxSizing: "border-box",

              "@media (max-width: 900px)": {
                position: "fixed",
                top: 0,
                right: 0,
                left: 0,
                width: "100%",
                height: "100%",
                padding: "20px",
                fontSize: "20px",
                border: "none",
                overflowY: "auto",
                boxSizing: "border-box",
              },
            }}
          >
            {notifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <button
                  aria-label="Close"
                  onClick={() => {
                    console.log("Close button has been clicked");
                    handleHideDrawer();
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    zIndex: 1001,
                  }}
                >
                  <img
                    src={closeIcon}
                    alt="Close"
                    style={{ width: "15px", height: "15px" }}
                  />
                </button>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  }}
                >
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
            ) : (
              <p>No new notification for now</p>
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
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

const opacityAnim = {
  from: { opacity: 0.5 },
  to: { opacity: 1 },
};

const bounceAnim = {
  "0%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-5px)" },
  "100%": { transform: "translateY(0px)" },
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  menuItem: {
    textAlign: "right",
    padding: "10px",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityAnim, bounceAnim],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3",
    },
  },
  notifications: {
    position: "absolute",
    top: "40px",
    right: "10px",
    width: "350px",
    border: "2px dashed red",
    fontSize: "15px",
    backgroundColor: "#fff",
    zIndex: 1000,
    padding: "10px",
    boxSizing: "border-box",

    "@media (max-width: 900px)": {
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      width: "100%",
      height: "100%",
      padding: "20px",
      fontSize: "20px",
      border: "none",
      overflowY: "auto",
      boxSizing: "border-box",
    },
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: "10px",
    marginBottom: "10px",
    "@media (max-width: 900px)": {
      paddingRight: "0",
    },
  },
  title: {
    fontWeight: "bold",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    zIndex: 10,

    "@media (max-width: 900px)": {
      alignSelf: "flex-start",
      marginLeft: "auto",
      marginTop: "-10px",
      marginRight: "-10px",
      padding: "5px",
    },
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  noNotif: {
    marginTop: "10px",
  },
});

export default Notifications;
