const { getRandomQuizzes } = require('../src/client/quizzes');

test("invalid", () => {
  expect(() => getRandomQuizzes(-1)).toThrow();
  expect(() => getRandomQuizzes(0)).toThrow();
  expect(() => getRandomQuizzes(100)).toThrow();
});
test("valid 1 ", () => {
  const quiz = getRandomQuizzes(1);
  expect(quiz.length).toBe(1);
  expect(quiz[0].question).toBeDefined();
  expect(quiz[0].answers).toBeDefined();
  expect(quiz[0].answers.length).toBe(4);
});

test("Test 2", () => {
  for (let i = 0; i < 100; i++) {
    const quiz = getRandomQuizzes(2);

    expect(quiz.length).toBe(2);
    expect(quiz[0].question).not.toBe(quiz[1].question);
  }
});
