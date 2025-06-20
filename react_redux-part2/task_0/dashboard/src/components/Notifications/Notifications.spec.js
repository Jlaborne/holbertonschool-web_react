
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Notifications from './Notifications';
import * as notificationSlice from '../../features/notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Notifications component (refactored with visible toggle)', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
        ],
      },
    });
    jest.spyOn(notificationSlice, 'fetchNotifications').mockReturnValue(() => Promise.resolve());
  });

  it('does not show the notification list by default', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const drawer = screen.getByTestId('notification-container');
    expect(drawer.className.includes('visible')).toBe(false);
  });

  it('toggles visible class when clicking the notification text and close button', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const drawer = screen.getByTestId('notification-container');
    const toggleText = screen.getByText(/your notifications/i);
    fireEvent.click(toggleText);
    expect(drawer.className.includes('visible')).toBe(true);

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(drawer.className.includes('visible')).toBe(false);
  });

  it('renders all notification items', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const toggleText = screen.getByText(/your notifications/i);
    fireEvent.click(toggleText);
    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
});
