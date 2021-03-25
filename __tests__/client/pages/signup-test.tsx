import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React, { ChangeEvent } from "react";
import { useSubmit } from "../../../src/client/lib/useSubmit";
import userEvent from "@testing-library/user-event";
import { Signup } from "../../../src/client/pages/signup";

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

it("should render signup", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  screen.getByRole("heading");
  screen.getByRole("textbox", { name: "username:" });
  const a = screen.getByText("Sign up");
  screen.getByText("Login");
  userEvent.click(a);
  expect(action).toBe(1);
});
