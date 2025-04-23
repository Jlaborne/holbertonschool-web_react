/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders h1 with text School dashboard", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders two paragraphs with specific text", () => {
    render(<App />);
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();

    const footerText = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        content.includes(
          `Copyright ${new Date().getFullYear()} - Holberton School`
        )
      );
    });
    expect(footerText).toBeInTheDocument();
  });

  test("renders the logo image", () => {
    render(<App />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test("renders 2 input elements", () => {
    const { container } = render(<App />);
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(2);
  });

  test("renders 2 label elements with correct text", () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders a button with text OK", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });
});
