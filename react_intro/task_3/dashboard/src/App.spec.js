import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders heading", () => {
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders login text", () => {
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();
  });

  test("renders footer text with current year", () => {
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`Copyright ${currentYear} - Holberton School`, "i")
    );
    expect(footerText).toBeInTheDocument();
  });

  test("renders 2 input fields", () => {
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test("renders a button with text OK", () => {
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
