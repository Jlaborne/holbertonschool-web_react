import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";

describe("Notifications component", () => {
  test("renders notifications title text", () => {
    const { getByText } = render(<Notifications />);
    expect(getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test("renders close button", () => {
    render(<Notifications />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test("renders all 3 notification items", () => {
    render(<Notifications />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });

  test("renders urgent HTML content correctly", () => {
    const { container } = render(<Notifications />);
    const items = container.querySelectorAll("li");

    const htmlItem = Array.from(items).find(
      (item) =>
        item.textContent.includes("Urgent requirement") &&
        item.textContent.includes("complete by EOD")
    );

    expect(htmlItem).toBeTruthy();
  });

  test("logs on close button click", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Notifications />);
    const button = screen.getByRole("button", { name: /close/i });
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith("Close button has been clicked");
    spy.mockRestore();
  });
});
