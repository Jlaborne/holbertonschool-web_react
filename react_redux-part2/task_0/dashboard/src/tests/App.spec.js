import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from './test-utils';
import App from '../App';
import { StyleSheetTestUtils } from 'aphrodite';
import axios from 'axios';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

jest.mock('axios');

describe('App', () => {
  test('renders App without crashing', () => {
    renderWithProvider(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
  });

  test('renders Login when not logged in', () => {
    renderWithProvider(<App />, {
      preloadedState: {
        auth: { isLoggedIn: false },
      },
    });
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
  });

  test('renders CourseList when logged in', () => {
    axios.get.mockResolvedValueOnce({ data: { notifications: [] } });

    renderWithProvider(<App />, {
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: {
            email: 'test@example.com',
          },
        },
        courses: {
          courses: [],
        },
        notifications: {
          notifications: [],
        },
      },
    });

    expect(screen.getByText(/course list/i)).toBeInTheDocument();
  });
});
