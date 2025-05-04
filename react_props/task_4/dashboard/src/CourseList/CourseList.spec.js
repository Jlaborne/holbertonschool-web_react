import React from "react";
import { render } from "@testing-library/react";
import CourseList from "./CourseList";

describe("CourseList component", () => {
  test("renders 5 rows when given a list of courses", () => {
    const courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];

    const { container } = render(<CourseList courses={courses} />);
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(5); // 2 header rows + 3 course rows
  });

  test("renders 1 row when given an empty array", () => {
    const { container } = render(<CourseList courses={[]} />);
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(3); // 2 headers + 1 "no course available" row
  });
});
