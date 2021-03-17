const quiz = [
  {
    question: "what is absolute zero?",
    answers: ["-300 Celsius", "0 Kelvin", "0 Fahrenheit", "0 Celsius"],
    correct: 1,
  },
  {
    question: "do i like pickles?",
    answers: ["yes", "no", "what a stupid question", "dont know"],
    correct: 1,
  },
  {
    question: "what is a tomato?",
    answers: ["vegetable", "herb", "berry", "fruit"],
    correct: 3,
  },
];

function getRandomQuizzes(numberOfQuizzes) {
  if (numberOfQuizzes < 1) throw "Invalid number too low";
  if (numberOfQuizzes > quiz.length) throw "Too many quizzes asked for";

  const list = Array(numberOfQuizzes);

  let i = 0;
  while (i < numberOfQuizzes) {
    const k = Math.floor(quiz.length * Math.random());
    if (!list.includes(k)) {
      list[i] = k;
      i++;
    }
  }
  return Array.from(list).map((x) => quiz[x]);
}

module.exports = { quiz, getRandomQuizzes };
