const { getRandomQuizzes } = require("./quizzes");
const { reportEndOfMatch } = require("./users");

const matches = new Map();
let counter = 0;

const createMatch = (userId, numberOfQuizzes) => {
  if (matches.get(userId)) reportEndOfMatch(userId, false);

  const match = {
    id: counter++,
    current: 0,
    quizzes: getRandomQuizzes(numberOfQuizzes),
    victory: false,
    defeat: false,
  };
  matches.set(userId, match);
  return match;
};
const getMatch = (userId) => {
  return matches.get(userId);
};

function removeMatch(userId) {
  matches.delete(userId);
}

module.exports = {
  createMatch,
  getMatch,
  removeMatch,
};
