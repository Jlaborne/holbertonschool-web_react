import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils";

import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notifications component", () => {
  const notificationsList = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];

  test("Clicking on menu item calls handleDisplayDrawer", () => {
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );

    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);

    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test("Clicking close button calls handleHideDrawer", () => {
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        handleHideDrawer={handleHideDrawer}
      />
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
