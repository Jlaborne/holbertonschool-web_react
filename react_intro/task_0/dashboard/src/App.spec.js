import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders the h1 element with text "School dashboard"', () => {
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders the correct paragraph texts", () => {
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const copyright = screen.getByText(/copyright \d{4} - holberton school/i);

    expect(loginText).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
  });

  test('renders an image with alt text "holberton logo"', () => {
    const logo = screen.getByAltText(/holberton logo/i);
    expect(logo).toBeInTheDocument();
  });
});
