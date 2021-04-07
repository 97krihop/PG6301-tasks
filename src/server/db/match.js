const { getRandomQuizzes } = require("./quizzes");
const { reportEndOfMatch } = require("./users");

const matches = new Map();
const amountOfQuizzes = 3;

function removeCorrect(quizzes) {
  const { id, answers, question } = quizzes;
  return { question: { id, answers, question } };
}

const clearMatch = (userId, isVictory) => {
  reportEndOfMatch(userId, isVictory);
  matches.delete(userId);
  return { victory: isVictory };
};

const startMatches = (userId) => {
  if (matches.has(userId)) {
    clearMatch(userId, false);
  }
  const quizzes = getRandomQuizzes(amountOfQuizzes);
  matches.set(userId, {
    quizzes,
    current: 0,
  });
  return removeCorrect(quizzes[0]);
};

const nextQuestion = (userId, answer) => {
  if (!matches.has(userId)) {
    throw new Error("cant find match on this user");
  } else {
    const { quizzes, current } = matches.get(userId);
    if (quizzes[current].correct !== answer) {
      return clearMatch(userId, false);
    }
    const next = current + 1;
    if (next >= amountOfQuizzes) {
      return clearMatch(userId, true);
    }
    matches.set(userId, { quizzes, current: next });
    return removeCorrect(quizzes[next]);
  }
};
const ongoingQuestion = (userId) => {
  if (!matches.has(userId)) {
    throw new Error("cant find match on this user");
  } else {
    const { quizzes, current } = matches.get(userId);
    return removeCorrect(quizzes[current]);
  }
};

module.exports = { startMatches, nextQuestion, ongoingQuestion, matches };
