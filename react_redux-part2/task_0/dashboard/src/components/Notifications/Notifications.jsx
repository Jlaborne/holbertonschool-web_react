import { memo, useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false); // Local UI state

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggleDrawer = () => {
    setIsVisible((prev) => !prev);
  };

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  return (
    <>
      <div onClick={handleToggleDrawer} style={{ cursor: "pointer" }}>
        Your notifications
      </div>
      <div
        ref={drawerRef}
        className={css(styles.notifications, isVisible && styles.visible)}
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
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    border: "1px dashed crimson",
    padding: "1rem",
    width: "40%",
    marginLeft: "59%",
    marginBottom: "1rem",
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },
});

export default Notifications;
