import { memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const drawerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.classList.toggle(css(styles.visible));
    }
  };

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  return (
    <>
      <div onClick={handleToggleDrawer} style={{ cursor: "pointer" }}>
        Your notifications
      </div>
      <div
        ref={drawerRef}
        className={css(styles.notifications)}
        data-testid="notifications-container"
      >
        {notifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <button onClick={handleToggleDrawer} aria-label="Close">
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={() => handleMarkAsRead(notification.id)}
                />
              ))}
            </ul>
          </>
        ) : (
          <p>No new notifications for now</p>
        )}
      </div>
    </>
  );
});

const styles = StyleSheet.create({
  notifications: {
    border: "1px dashed crimson",
    padding: "1rem",
    width: "40%",
    marginLeft: "59%",
    marginBottom: "1rem",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },
  notificationTitle: {
    float: "right",
    position: "absolute",
    right: "10px",
    top: "2px",
    cursor: "pointer",
  },
  notificationsButton: {
    position: "absolute",
    cursor: "pointer",
    right: "5px",
    top: "20px",
    background: "transparent",
    border: "none",
  },
  notificationTypeDefault: {
    color: "blue",
  },
  notificationTypeUrgent: {
    color: "red",
  },
  menuItem: {
    textAlign: "right",
  },
});

export default Notifications;
