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
    const inputs = screen.getAllByLabelText(/./);
    expect(inputs.length).toBe(2);
  });

  test("renders labels for email and password", () => {
    const labels = document.querySelectorAll("label");
    expect(labels.length).toBe(2);
    expect(labels[0].textContent.toLowerCase()).toContain("email");
    expect(labels[1].textContent.toLowerCase()).toContain("password");
  });

  test("renders a button with the text OK", () => {
    expect(screen.getByRole("button", { name: /ok/i }));
  });
});
