import { fireEvent, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Header from './Header';
import { logout } from '../../features/auth/authSlice';
import { renderWithProvider } from '../../tests/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer'; // make sure this path is correct

jest.mock('../assets/holberton-logo.jpg', () => 'mocked-path.jpg');

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Header component', () => {
  const defaultState = {
    auth: {
      isLoggedIn: false,
      user: { email: '' },
    },
  };

  const loggedInState = {
    auth: {
      isLoggedIn: true,
      user: { email: 'user@example.com' },
    },
  };

  test('Renders heading and logo', () => {
    renderWithProvider(<Header />, { preloadedState: loggedInState });
    expect(
      screen.getByRole('heading', { name: /school dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  describe('When user is not logged in', () => {
    beforeEach(() => {
      renderWithProvider(<Header />, { preloadedState: defaultState });
    });

    test('Does not render logout section', () => {
      expect(screen.queryByTestId('logoutSection')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /logout/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('When user is logged in', () => {
    let store;

    beforeEach(() => {
      // Create a store and render before each test
      store = configureStore({
        reducer: rootReducer,
        preloadedState: loggedInState,
      });
      renderWithProvider(<Header />, { store });
    });

    test('Renders welcome message with email', () => {
      expect(
        screen.getByText((content) => content.includes('Welcome'))
      ).toBeInTheDocument();
      expect(screen.getByText('user@example.com')).toBeInTheDocument();
    });

    test('Renders logout link', () => {
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
    });

    test('Logout section is present', () => {
      expect(screen.getByTestId('logoutSection')).toBeInTheDocument();
    });
  });
});
