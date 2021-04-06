const { getRandomQuizzes } = require("./quizzes");
const { reportEndOfMatch } = require("./users");

const matches = new Map();
const amountOfQuizzes = 3;

const startMatches = (userId) => {
  if (matches.has(userId)) {
    clearMatch(userId, false);
  }
  const quizzes = getRandomQuizzes(amountOfQuizzes);
  matches.set(userId, {
    quizzes,
    current: 0,
  });
  return quizzes[0];
};

const clearMatch = (userId, isVictory) => {
  reportEndOfMatch(userId, isVictory);
  matches.delete(userId);
  return { victory: isVictory };
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
    matches.set(userId, { quizzes, next });
    return { question: quizzes[next] };
  }
};
const ongoingQuestion = (userId) => {
  if (!matches.has(userId)) {
    throw new Error("cant find match on this user");
  } else {
    const { quizzes, current } = matches.get(userId);
    return quizzes[current];
  }
};

module.exports = { startMatches, nextQuestion, ongoingQuestion, matches };
