import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../../src/client/pages/login";
import React, { ChangeEvent } from "react";
import { useSubmit } from "../../../src/client/lib/useSubmit";
import userEvent from "@testing-library/user-event";

jest.mock("../../../src/client/lib/useSubmit");

let action = 0;

beforeEach(() => {
  action = 0;
  // @ts-ignore
  useSubmit.mockImplementation(() => {
    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      action++;
    };
    const submitting = false;
    const error = undefined;
    return { handleSubmit, submitting, error };
  });
});

it("should render login", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  screen.getByRole("heading");
  screen.getByRole("textbox", { name: "username:" });
  const a = screen.getByText("Log in");
  screen.getByText("SignUp");
  userEvent.click(a);
  expect(action).toBe(1);
});
it("should render login", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  screen.getByRole("heading");
  screen.getByRole("textbox", { name: "username:" });
  const a = screen.getByText("Log in");
  screen.getByText("SignUp");
  userEvent.click(a);
  expect(action).toBe(1);
});
