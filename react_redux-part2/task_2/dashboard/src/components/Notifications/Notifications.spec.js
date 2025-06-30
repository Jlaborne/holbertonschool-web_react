import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../../tests/test-utils';
import Notifications from './Notifications';
import * as notificationsSlice from '../../features/notifications/notificationsSlice';

jest.mock('../../assets/close-icon.png', () => 'close-icon.png');

describe('Notifications component', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Alert</strong>' } },
  ];

  it('renders notification title and empty message when no notifications', () => {
    renderWithProvider(<Notifications />, {
      preloadedState: { notifications: { notifications: [] } },
    });

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/no new notifications/i)).toBeInTheDocument();
  });

  it('renders list of notifications', () => {
    renderWithProvider(<Notifications />, {
      preloadedState: { notifications: { notifications: mockNotifications } },
    });

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('closes and opens drawer with toggle', () => {
    renderWithProvider(<Notifications />, {
      preloadedState: { notifications: { notifications: mockNotifications } },
    });

    const drawer = document.querySelector('.Notifications');
    const toggle = screen.getByText(/your notifications/i);
    const closeButton = screen.getByRole('button', { name: /close/i });

    expect(drawer.classList.contains('visible')).toBe(true);

    fireEvent.click(closeButton);
    expect(drawer.classList.contains('visible')).toBe(false);

    fireEvent.click(toggle);
    expect(drawer.classList.contains('visible')).toBe(true);
  });
});
