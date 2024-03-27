import React from "react";
import { render, screen } from "@testing-library/react";
import AnalysisDetailPage from "./AnalysisDetailPage";

test("renders loading message", () => {
  render(<AnalysisDetailPage />);
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
