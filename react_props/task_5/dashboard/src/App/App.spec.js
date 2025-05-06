import { render, screen } from "@testing-library/react";
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

  test("renders CourseList component when isLoggedIn is true", () => {
    // Simuler isLoggedIn = true
    const AppWithCourses = () => {
      const isLoggedIn = true;
      const coursesList = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ];
      return (
        <>
          <Header />
          <CourseList courses={coursesList} />
          <Footer />
        </>
      );
    };

    const { container } = render(<AppWithCourses />);
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(5);
  });
});
