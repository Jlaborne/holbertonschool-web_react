import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Notifications from "../Notifications/Notifications";
import { getLatestNotification } from "../utils/utils";

import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("App component", () => {
  const notificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("renders Header component", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test("renders Login component", () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<App />);
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();
  });

  test("renders Notifications component", () => {
    render(<App />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("renders Login component when isLoggedIn is false", () => {
    render(<App />);
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();
  });

  test("displays 'Course list' title when isLoggedIn is true", () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });

  test("displays 'Log in to continue' title when isLoggedIn is false", () => {
    render(<App isLoggedIn={false} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /log in to continue/i })
    ).toBeInTheDocument();
  });

  test("calls logOut when Ctrl+H is pressed", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const logOutMock = jest.fn();
    render(<App logOut={logOutMock} />);

    fireEvent.keyDown(document, { key: "h", ctrlKey: true });

    expect(logOutMock).toHaveBeenCalledTimes(1);
    alertMock.mockRestore();
  });

  test('displays alert with "Logging you out" when Ctrl+H is pressed', () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const logOutMock = jest.fn();

    render(<App logOut={logOutMock} />);
    fireEvent.keyDown(document, { key: "h", ctrlKey: true });

    expect(alertMock).toHaveBeenCalledWith("Logging you out");

    alertMock.mockRestore();
  });

  test("displays news section with title and paragraph", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: /news from the school/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/holberton school news goes here/i)
    ).toBeInTheDocument();
  });

  test("calls handleDisplayDrawer when menu item is clicked", () => {
    const handleDisplayDrawer = jest.fn();
    render(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test("calls handleHideDrawer when close button is clicked", () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
        notifications={notificationsList}
      />
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
