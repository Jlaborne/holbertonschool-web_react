import { screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Footer from './Footer';
import { renderWithProvider } from '../../tests/test-utils';
import * as utils from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  getCurrentYear: jest.fn(() => 2025),
  getFooterCopy: jest.fn(() => 'Holberton School'),
}));

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.clearAllMocks();
});

describe('Footer component', () => {
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

  test('renders copyright text', () => {
    renderWithProvider(<Footer />, { preloadedState: defaultState });

    expect(
      screen.getByText(/Copyright 2025 - Holberton School/i)
    ).toBeInTheDocument();
  });

  test('does not render Contact us when not logged in', () => {
    renderWithProvider(<Footer />, { preloadedState: defaultState });

    expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
  });

  test('renders Contact us when logged in', () => {
    renderWithProvider(<Footer />, { preloadedState: loggedInState });

    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});
