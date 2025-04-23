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

  test("renders body and footer paragraphs with correct text", () => {
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
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders 2 label elements with text Email and Password", () => {
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel.tagName.toLowerCase()).toBe("label");
    expect(passwordLabel.tagName.toLowerCase()).toBe("label");
  });

  test("renders a button with text OK", () => {
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
