import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications component", () => {
  beforeEach(() => {
    render(<Notifications />);
  });

  test("renders notifications title", () => {
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test("renders 3 list items", () => {
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(3);
  });

  test("clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore();
  });
});
