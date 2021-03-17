/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import React from "react";
import LoadingView from "../../../src/client/components/LoadingView";

it("should render home", () => {
  render(<LoadingView />);
  screen.getByText("Loading ...");
});
