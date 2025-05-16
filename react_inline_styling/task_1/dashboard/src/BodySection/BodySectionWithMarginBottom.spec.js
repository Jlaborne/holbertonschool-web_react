import React from "react";
import { render, screen } from "@testing-library/react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("BodySectionWithMarginBottom", () => {
  test("renders a div with the correct title", () => {
    render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Child content</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Title"
    );
  });

  test("renders the children content correctly", () => {
    render(
      <BodySectionWithMarginBottom title="Another Title">
        <p>Child content</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
