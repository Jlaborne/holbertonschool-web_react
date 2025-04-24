/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications component", () => {
  test("renders notifications title", () => {
    render(<Notifications />);
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the close button", () => {
    render(<Notifications />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test("renders 3 list items", () => {
    const { container } = render(<Notifications />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  test("clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(<Notifications />);
    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore(); // clean up
  });
});
