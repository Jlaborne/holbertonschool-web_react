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

  test("renders correct text in body and footer", () => {
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
