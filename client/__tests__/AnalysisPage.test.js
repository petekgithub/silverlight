import React from "react";
import { render, screen } from "@testing-library/react";
import AnalysisPage from "./AnalysisPage";

test("renders SilverLight heading", () => {
  render(<AnalysisPage />);
  const headingElement = screen.getByText(/SilverLight/i);
  expect(headingElement).toBeInTheDocument();
});
