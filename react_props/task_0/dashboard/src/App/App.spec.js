import { render, screen } from "@testing-library/react";
import App from "../App/App";

describe("App component", () => {
  test("renders Header component", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test("renders Login component", () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<App />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });

  test("renders Notifications component", () => {
    render(<App />);
    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });
});
