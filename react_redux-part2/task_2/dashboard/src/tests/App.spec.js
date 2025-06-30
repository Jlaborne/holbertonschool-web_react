import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from './test-utils';
import App from '../App';
import { StyleSheetTestUtils } from 'aphrodite';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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

  test('renders CourseList when logged in', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('courses.json')) {
        return Promise.resolve({
          data: {
            courses: [
              { id: 1, name: 'Math', credit: 3 },
              { id: 2, name: 'History', credit: 2 },
            ],
          },
        });
      }

      if (url.includes('notifications.json')) {
        return Promise.resolve({
          data: {
            notifications: [],
          },
        });
      }

      return Promise.resolve({ data: {} });
    });

    renderWithProvider(<App />, {
      preloadedState: {
        auth: {
          isLoggedIn: true,
          user: {
            email: 'test@example.com',
          },
        },
      },
    });

    expect(await screen.findByText(/course list/i)).toBeInTheDocument();
  });
});
