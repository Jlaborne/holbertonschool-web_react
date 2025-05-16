import { render, screen } from "@testing-library/react";
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
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(2);
  });

  test("renders labels for email and password", () => {
    render(<Login />);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels.length).toBe(2);
  });

  test("renders a button with the text OK", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /^OK$/ })).toBeInTheDocument();
  });
});
