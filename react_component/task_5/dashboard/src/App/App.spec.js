import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";

describe("App component", () => {
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
    expect(
      screen.getByRole("heading", { level: 2, name: /course list/i })
    ).toBeInTheDocument();
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
});
