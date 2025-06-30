// src/features/notifications/notificationsSlice.spec.js
import reducer, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('axios');
jest.mock('../../utils/utils');

describe('notificationsSlice', () => {
  const mockInitialState = {
    notifications: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(mockInitialState);
  });

  it('should handle fetchNotifications fulfilled with replacement logic', async () => {
    // Arrange
    const mockServerNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 3, type: 'urgent', value: 'Old resume available' }, // This one will be replaced
    ];
    const mockHtml = '<strong>Urgent requirement</strong>';

    axios.get.mockResolvedValueOnce({
      data: { notifications: mockServerNotifications },
    });
    getLatestNotification.mockReturnValue(mockHtml);

    const store = configureStore({
      reducer: {
        notifications: reducer,
      },
    });

    // Act
    await store.dispatch(fetchNotifications());

    // Assert
    const { notifications } = store.getState().notifications;
    expect(notifications).toHaveLength(2);
    expect(notifications.find((n) => n.id === 3)).toEqual({
      id: 3,
      type: 'urgent',
      html: { __html: mockHtml },
    });
  });

  it('should handle markNotificationAsRead by removing correct ID', () => {
    const stateBefore = {
      notifications: [
        { id: 1, type: 'default', value: 'Note 1' },
        { id: 2, type: 'urgent', value: 'Note 2' },
      ],
    };

    const stateAfter = reducer(stateBefore, markNotificationAsRead(2));

    expect(stateAfter.notifications).toEqual([
      { id: 1, type: 'default', value: 'Note 1' },
    ]);
  });

  it('should not change state if markNotificationAsRead is called with invalid ID', () => {
    const stateBefore = {
      notifications: [{ id: 1, type: 'default', value: 'Note 1' }],
    };

    const stateAfter = reducer(
      stateBefore,
      markNotificationAsRead('not-a-number')
    );

    expect(stateAfter).toEqual(stateBefore);
  });
});
