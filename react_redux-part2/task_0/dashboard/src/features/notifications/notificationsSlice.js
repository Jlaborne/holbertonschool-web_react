import { memo, useEffect, useState } from "react";
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

  const [displayDrawer, setDisplayDrawer] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleToggleDrawer = () => setDisplayDrawer(!displayDrawer);
  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>

      {displayDrawer && (
        <div
          className={css(styles.notifications, styles.visible)}
          data-testid="notifications-container"
        >
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <button
                onClick={handleToggleDrawer}
                aria-label="Close"
                className={css(styles.closeButton)}
              >
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
      )}
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
    transition: "all 0.3s ease-in-out",
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },
  menuItem: {
    cursor: "pointer",
    textAlign: "right",
    marginBottom: "10px",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    float: "right",
  },
});

export default Notifications;
