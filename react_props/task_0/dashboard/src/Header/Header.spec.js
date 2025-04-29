import { render, screen } from "@testing-library/react";
import Header from "../Header/Header";

describe("Header", () => {
  test("renders logo image", () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test("renders heading with text School dashboard", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /school dashboard/i })
    ).toBeInTheDocument();
  });
});
