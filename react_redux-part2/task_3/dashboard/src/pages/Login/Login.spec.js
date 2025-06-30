import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { renderWithProvider } from '../../tests/test-utils';
import { login } from '../../features/auth/authSlice';

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    useDispatch: jest.fn(),
  };
});

import { useDispatch } from 'react-redux';

test('Testing signin form elements', async () => {
  renderWithProvider(<Login />);
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: 'OK' });

  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');
  expect(screen.getByLabelText(/email/i)).toBe(emailInput);

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');

  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test('Email input is focused when its label is clicked', async () => {
  renderWithProvider(<Login />);
  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');
  await userEvent.click(emailLabel);
  await waitFor(() => expect(emailInput).toHaveFocus());
});

test('Password input is focused when its label is clicked', async () => {
  renderWithProvider(<Login />);
  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');
  await userEvent.click(passwordLabel);
  await waitFor(() => expect(passwordInput).toHaveFocus());
});

test('Submit button is disabled by default', () => {
  renderWithProvider(<Login isLoggedIn={false} />);
  const submitButton = screen.getByText('OK');
  expect(submitButton).toBeDisabled();
});

test('Submit button only enabled with valid email and password', async () => {
  renderWithProvider(<Login isLoggedIn={false} />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(passwordInput, '123');
  expect(submitButton).toBeDisabled();

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, 'test.com');
  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, '12345678');
  expect(submitButton).toBeDisabled();

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, '12345678');
  expect(submitButton).not.toBeDisabled();
});

describe('Login Component Tests', () => {
  test('Initializes with empty email and password', () => {
    renderWithProvider(<Login />);
    expect(screen.getByLabelText(/email/i).value).toBe('');
    expect(screen.getByLabelText(/password/i).value).toBe('');
  });

  test('Calls logIn on form submit', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    renderWithProvider(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      login({ email: 'test@test.com', password: 'password123' })
    );
  });

  test('Updates state on input change', async () => {
    renderWithProvider(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'newemail@test.com');
    await userEvent.type(passwordInput, 'newpassword');

    expect(emailInput.value).toBe('newemail@test.com');
    expect(passwordInput.value).toBe('newpassword');
  });
});
