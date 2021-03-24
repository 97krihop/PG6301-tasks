/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Match } from "../../../src/client/pages/match";
import { useFetch } from "../../../src/client/lib/useFetch";

const quiz = {
  question: "what is absolute zero?",
  answers: ["-300 Celsius", "0 Kelvin", "0 Fahrenheit", "0 Celsius"],
  correct: 1,
};
const quiz2 = {
  question: "wow?",
  answers: ["-qw", "0 aaa", "0 sdasd", "0 aww"],
  correct: 1,
};
jest.mock("../../../src/client/hooks/useFetch");

beforeEach(() => {
  // @ts-ignore
  useFetch.mockImplementation(() => {
    return {
      data: [quiz],
      loading: false,
      error: null,
      reload: () => {},
    };
  });
});

it("should render quiz and win", async () => {
  render(<Match />);
  await screen.findByText(`Question: ${quiz.question}`);
  const answer = await screen.findByText(`B: ${quiz.answers[1]}`);
  userEvent.click(answer);
  await screen.findByText("You Won!");
});

it("should render quiz and and loose", async () => {
  render(<Match />);
  await screen.findByText(`Question: ${quiz.question}`);
  const answer = await screen.findByText(`A: ${quiz.answers[0]}`);
  userEvent.click(answer);
  await screen.findByText("Wrong Answer! You Lost!");
});

it("should render quiz and go to next if correct", async () => {
  // @ts-ignore
  useFetch.mockImplementation(() => {
    return {
      data: [quiz, quiz2],
      loading: false,
      error: null,
      reload: () => {},
    };
  });

  render(<Match />);
  await screen.findByText(`Question: ${quiz.question}`);
  await screen.findByText(`A: ${quiz.answers[0]}`);
  const answer = await screen.findByText(`B: ${quiz.answers[1]}`);
  await screen.findByText(`C: ${quiz.answers[2]}`);
  await screen.findByText(`D: ${quiz.answers[3]}`);
  userEvent.click(answer);
  await screen.findByText(`Question: ${quiz2.question}`);
  await screen.findByText(`A: ${quiz2.answers[0]}`);
  await screen.findByText(`B: ${quiz2.answers[1]}`);
  await screen.findByText(`C: ${quiz2.answers[2]}`);
  await screen.findByText(`D: ${quiz2.answers[3]}`);
});

it("should render quiz and win", async () => {
  // @ts-ignore
  useFetch.mockImplementation(() => {
    return {
      data: null,
      loading: false,
      error: "Error when connecting to server",
      reload: () => {},
    };
  });
  render(<Match />);
  await screen.findByText(`Error when connecting to server`);
});
