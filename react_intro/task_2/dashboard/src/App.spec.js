/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders h1 with text School dashboard", () => {
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders two paragraphs with specific text", () => {
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`^copyright 2025 - holberton school$`, "i")
    );
    expect(footerText).toBeInTheDocument();
  });

  test("renders the logo image", () => {
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test("renders 2 input elements", () => {
    const inputs = screen.getAllByRole("textbox");
    const password = screen.getByLabelText(/password/i);
    expect(inputs.length).toBe(1);
    expect(password).toBeInTheDocument();
  });

  test("renders 2 label elements with correct text", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders a button with text OK", () => {
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });
});
