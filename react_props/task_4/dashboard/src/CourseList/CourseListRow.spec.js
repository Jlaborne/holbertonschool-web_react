import React from "react";
import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

describe("CourseListRow component", () => {
  describe("Header row", () => {
    test("renders one th with colSpan=2 when textSecondCell is null", () => {
      render(<CourseListRow isHeader={true} textFirstCell="Header Only" />);
      const th = screen.getByRole("columnheader");
      expect(th).toBeInTheDocument();
      expect(th).toHaveAttribute("colSpan", "2");
      expect(th.textContent).toBe("Header Only");
    });

    test("renders two th cells when textSecondCell is not null", () => {
      render(
        <table>
          <thead>
            <CourseListRow
              isHeader={true}
              textFirstCell="Course name"
              textSecondCell="Credit"
            />
          </thead>
        </table>
      );
      const headers = screen.getAllByRole("columnheader");
      expect(headers).toHaveLength(2);
      expect(headers[0].textContent).toBe("Course name");
      expect(headers[1].textContent).toBe("Credit");
    });
  });

  describe("Regular row", () => {
    test("renders two td cells when isHeader is false", () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              isHeader={false}
              textFirstCell="ES6"
              textSecondCell="60"
            />
          </tbody>
        </table>
      );
      const cells = screen.getAllByRole("cell");
      expect(cells).toHaveLength(2);
      expect(cells[0].textContent).toBe("ES6");
      expect(cells[1].textContent).toBe("60");
    });
  });
});
