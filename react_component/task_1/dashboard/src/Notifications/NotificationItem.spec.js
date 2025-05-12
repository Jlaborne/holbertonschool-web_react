import { render, screen } from "@testing-library/react";
import NotificationItem from "./NotificationItem";

describe("NotificationItem component", () => {
  test('renders with type="default" with blue color and correct attribute', () => {
    render(<NotificationItem type="default" value="Test Default" />);
    const listItem = screen.getByText("Test Default");

    expect(listItem).toHaveAttribute("data-notification-type", "default");
    expect(listItem).toHaveStyle({ color: "blue" });
  });

  test('renders with type="urgent" with red color and correct attribute', () => {
    render(<NotificationItem type="urgent" value="Test Urgent" />);
    const listItem = screen.getByText("Test Urgent");

    expect(listItem).toHaveAttribute("data-notification-type", "urgent");
    expect(listItem).toHaveStyle({ color: "red" });
  });
});
