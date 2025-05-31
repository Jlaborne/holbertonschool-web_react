import { memo } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
// import { StyleSheet, css } from "aphrodite";

function Notifications({
  displayDrawer,
  notifications,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead,
}) {
  return (
    <div
    // className={css(styles.container)}
    >
      {!displayDrawer && (
        <div
          // className={css(styles.menuItem)}
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
      )}

      {displayDrawer && (
        <div
        // className={css(styles.notifications)}
        >
          <div
          // className={css(styles.panelHeader)}
          >
            {notifications.length > 0 && (
              <p
              // className={css(styles.title)}
              >
                Here is the list of notifications
              </p>
            )}
            <button
              // className={css(styles.closeButton)}
              aria-label="Close"
              onClick={() => {
                console.log('Close button has been clicked');
                handleHideDrawer();
              }}
            >
              <img
                src={closeIcon}
                alt="Close"
                // className={css(styles.icon)}
              />
            </button>
          </div>

          {notifications.length === 0 ? (
            <p
            // className={css(styles.noNotif)}
            >
              No new notification for now
            </p>
          ) : (
            <ul
            // className={css(styles.ul)}
            >
              {notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  id={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                  markAsRead={markNotificationAsRead}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
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
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

// Only re-render if props changed
function areEqual(prevProps, nextProps) {
  return (
    prevProps.displayDrawer === nextProps.displayDrawer &&
    prevProps.notifications.length === nextProps.notifications.length &&
    JSON.stringify(prevProps.notifications) ===
      JSON.stringify(nextProps.notifications)
  );
}

export default memo(Notifications, areEqual);
