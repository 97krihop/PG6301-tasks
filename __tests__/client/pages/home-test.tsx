/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../../src/client/pages/home";
import { MemoryRouter } from "react-router-dom";
import { fetchJson } from "../../../src/client/lib/http";
import { act } from "react-dom/test-utils";

jest.mock("../../../src/client/lib/http");
// @ts-ignore
fetchJson.mockResolvedValue({ id: "a", victories: 0, defeats: 0 });
it("should render home", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
  screen.getByText("hello welcome to quiz game");
  screen.getByText("start game");
});
