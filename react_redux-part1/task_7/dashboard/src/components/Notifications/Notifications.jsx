import { memo, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import { useSelector, useDispatch } from "react-redux";
import {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
  fetchNotifications,
} from "../../features/notifications/notificationsSlice";

const styles = StyleSheet.create({
  notificationTitle: {},
  notifications: {},
  notificationsButton: {},
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

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();

  const displayDrawer = useSelector(
    (state) => state.notifications.displayDrawer
  );
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleDisplayDrawer = () => dispatch(showDrawer());
  const handleHideDrawer = () => dispatch(hideDrawer());
  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  return (
    <>
      <div
        className={css(styles.notificationTitle)}
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>
      {displayDrawer && (
        <div className={css(styles.notifications)}>
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <button
                onClick={handleHideDrawer}
                aria-label="Close"
                className={css(styles.notificationsButton)}
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
                    className={
                      notification.type === "urgent"
                        ? css(styles.notificationTypeUrgent)
                        : css(styles.notificationTypeDefault)
                    }
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

export default Notifications;
