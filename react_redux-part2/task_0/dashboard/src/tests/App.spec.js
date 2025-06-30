import { screen, waitFor } from '@testing-library/react';
import { renderWithProvider } from './test-utils';
import App from '../App';
import { StyleSheetTestUtils } from 'aphrodite';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();

  axios.get.mockResolvedValue({
    data: { notifications: [] },
  });
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.clearAllMocks();
});

describe('App', () => {
  test('renders App without crashing', async () => {
    renderWithProvider(<App />);
    await waitFor(() =>
      expect(screen.getByText(/news from the school/i)).toBeInTheDocument()
    );
  });

  test('renders Login when not logged in', async () => {
    renderWithProvider(<App />, {
      preloadedState: {
        auth: { isLoggedIn: false },
        notifications: {
          notifications: [],
        },
      },
    });
    await waitFor(() =>
      expect(screen.getByText(/log in to continue/i)).toBeInTheDocument()
    );
  });

  test('renders CourseList when logged in', async () => {
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

    await waitFor(() =>
      expect(screen.getByText(/course list/i)).toBeInTheDocument()
    );
  });
});
