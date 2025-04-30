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

  test("renders expected notification list items", () => {
    expect(screen.getByText("New course available")).toBeInTheDocument();
    expect(screen.getByText("New resume available")).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });

  test("clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore();
  });
});
