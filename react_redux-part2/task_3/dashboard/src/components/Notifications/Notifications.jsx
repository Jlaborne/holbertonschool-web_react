import { memo, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import NotificationItem from '../NotificationItem/NotificationItem';
import { getFilteredNotifications } from '../../features/selectors/notificationSelector';
import closeIcon from '../../assets/close-icon.png';
import './Notifications.css';

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState('all'); // default is 'all'
  const drawerRef = useRef(null);

  const loading = useSelector((state) => state.notifications.loading);
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  const handleToggleDrawer = useCallback(() => {
    drawerRef.current.classList.toggle('visible');
  }, []);

  const handleMarkNotificationAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleSetFilterUrgent = () => {
    setCurrentFilter(currentFilter === 'urgent' ? 'all' : 'urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter(currentFilter === 'default' ? 'all' : 'default');
  };

  return (
    <>
      <div className="notification-title" onClick={handleToggleDrawer}>
        Your notifications
      </div>
      <div className="Notifications visible" ref={drawerRef}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <div>
              <button onClick={handleSetFilterUrgent}>‼️</button>
              <button onClick={handleSetFilterDefault}>??</button>
            </div>
            <button onClick={handleToggleDrawer} aria-label="Close">
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul>
              {filteredNotifications.map(({ id, type, value }) => (
                <NotificationItem
                  key={id}
                  id={id}
                  type={type}
                  value={value}
                  markAsRead={() => handleMarkNotificationAsRead(id)}
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

export default Notifications;
