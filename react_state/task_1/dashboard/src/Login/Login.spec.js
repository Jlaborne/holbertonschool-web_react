import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Login component", () => {
  test("renders 2 input elements", () => {
    const { container } = render(<Login />);
    const inputs = container.querySelectorAll(
      "input[type='email'], input[type='password']"
    );
    expect(inputs.length).toBe(2);
  });

  test("renders labels for email and password", () => {
    render(<Login />);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels.length).toBe(2);
  });

  test("renders a submit button with the text OK", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /^OK$/i })).toBeInTheDocument();
  });

  test("submit button is disabled by default", () => {
    render(<Login />);
    const submitBtn = screen.getByRole("button", { name: /^OK$/i });
    expect(submitBtn).toBeDisabled();
  });

  test("submit button becomes enabled with valid email and strong password", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    const submitBtn = screen.getByRole("button", { name: /^OK$/i });
    expect(submitBtn).toBeEnabled();
  });
});
