/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Match } from '../../../src/client/pages/match';
import { fetchQuizzes } from '../../../src/client/utils/fetchQuizzes';

const quiz = {
  question: 'what is absolute zero?',
  answers: ['-300 Celsius', '0 Kelvin', '0 Fahrenheit', '0 Celsius'],
  correct: 1,
};

jest.mock('../../../src/client/utils/fetchQuizzes');

it('should render quiz and win', async () => {
  // @ts-ignore
  fetchQuizzes.mockImplementation(() => {
    return [quiz];
  });
  render(<Match />);
  await screen.findByText(`Question: ${quiz.question}`);
  const answer = await screen.findByText(`B: ${quiz.answers[1]}`);
  userEvent.click(answer);
  await screen.findByText('You Won!');
});

it('should render quiz and and loose', async () => {
  // @ts-ignore
  fetchQuizzes.mockImplementation(() => {
    return [quiz];
  });
  render(<Match />);
  await screen.findByText(`Question: ${quiz.question}`);
  const answer = await screen.findByText(`A: ${quiz.answers[0]}`);
  userEvent.click(answer);
  await screen.findByText('Wrong Answer! You Lost!');
});
it('should render quiz and go to next if correct', async () => {
  const quiz2 = {
    question: 'wow?',
    answers: ['-qw', '0 aaa', '0 sdasd', '0 aww'],
    correct: 1,
  };
  // @ts-ignore
  fetchQuizzes.mockImplementation(() => {
    return [quiz, quiz2];
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
