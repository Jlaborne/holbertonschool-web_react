import { createSelector } from 'reselect';

export const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [selectNotifications, (_, filter) => filter],
  (notifications, filter) => {
    if (filter === 'urgent' || filter === 'default') {
      return notifications.filter((notif) => notif.type === filter);
    }
    return notifications;
  }
);
