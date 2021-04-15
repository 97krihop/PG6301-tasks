import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Match } from "../../../src/client/pages/match";
import { fetchJson, postJson } from "../../../src/client/lib/http";

const quiz1 = {
  currentQuiz: {
    question: "what is absolute zero?",
    answers: ["-300 Celsius", "0 Kelvin", "0 Fahrenheit", "0 Celsius"],
  },
  victory: false,
  defeat: false,
};

jest.mock("../../../src/client/lib/http");

beforeEach(() => {
  // @ts-ignore
  fetchJson.mockResolvedValue(quiz1);
  // @ts-ignore
  postJson.mockImplementation(() => {});
});

it("should render quiz and win", async () => {
  render(<Match />);

  await screen.findByText(`Question: ${quiz1.currentQuiz.question}`);
  const answer = await screen.findByText(`B: ${quiz1.currentQuiz.answers[1]}`);

  // @ts-ignore
  postJson.mockResolvedValue({ victory: true });

  userEvent.click(answer);
  await screen.findByText("You Won!");
});

it("should render quiz and and loose", async () => {
  render(<Match />);
  await screen.findByText(`Question: ${quiz1.currentQuiz.question}`);
  const answer = await screen.findByText(`B: ${quiz1.currentQuiz.answers[1]}`);

  // @ts-ignore
  postJson.mockResolvedValue({ defeat: true });

  userEvent.click(answer);
  await screen.findByText("Wrong Answer! You Lost!");
});

it("should render error", async () => {
  // @ts-ignore
  postJson.mockImplementation(() => {
    return Promise.reject(new Error("something went wrong"));
  });

  render(<Match />);
  await screen.findByText(`undefinedError: something went wrong`);
});
