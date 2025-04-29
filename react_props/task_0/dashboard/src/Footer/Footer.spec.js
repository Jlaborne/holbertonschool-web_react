import { render, screen } from "@testing-library/react";
import Footer from "../Footer/Footer";

describe("Footer", () => {
  test("getCurrentYear returns the current year", () => {
    const year = new Date().getFullYear();
    expect(getCurrentYear()).toBe(year);
  });

  describe("getFooterCopy", () => {
    test('returns "Holberton School" when argument is true', () => {
      expect(getFooterCopy(true)).toBe("Holberton School");
    });

    test('returns "Holberton School main dashboard" when argument is false', () => {
      expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
    });
  });
});
