import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils";

describe("Notifications component", () => {
  const notificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("renders notifications title", () => {
    render(<Notifications notifications={notificationsList} />);
    const title = screen.getByText(/here is the list of notifications/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the close button", () => {
    render(<Notifications notifications={notificationsList} />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test("renders 3 list items", () => {
    const { container } = render(
      <Notifications notifications={notificationsList} />
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  test("clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Notifications notifications={notificationsList} />);
    const button = screen.getByRole("button", { name: /close/i });

    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore(); // clean up
  });
});
