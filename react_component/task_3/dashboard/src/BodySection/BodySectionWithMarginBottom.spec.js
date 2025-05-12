import React from "react";
import { render } from "@testing-library/react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";

describe("BodySectionWithMarginBottom", () => {
  test("renders a div with class bodySectionWithMargin", () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Section Title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );

    expect(
      container.querySelector(".bodySectionWithMargin")
    ).toBeInTheDocument();
  });

  test("renders the BodySection component inside", () => {
    const { getByText } = render(
      <BodySectionWithMarginBottom title="Section Title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test title"
    );
  });
});
