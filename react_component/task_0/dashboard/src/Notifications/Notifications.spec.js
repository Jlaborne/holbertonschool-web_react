import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils";

describe("Notifications component", () => {
  const notificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("Always renders 'Your notifications' title", () => {
    render(<Notifications />);
    const title = screen.getByText(/your notifications/i);
    expect(title).toBeInTheDocument();
  });

  test("Does not display notifications list when displayDrawer is false", () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />
    );

    expect(
      screen.queryByText(/here is the list of notifications/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });

  test("Displays notifications list when displayDrawer is true", () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />
    );

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("Displays 'No new notification for now' if notifications is empty", () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);

    expect(
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();
  });

  test("Clicking the close button logs to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />
    );

    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);
    expect(consoleSpy).toHaveBeenCalledWith("Close button has been clicked");

    consoleSpy.mockRestore(); // cleanup
  });
});
