const quiz = [
  {
    question: 'what is absolute zero?',
    answers: ['-300 Celsius', '0 Kelvin', '0  Fahrenheit', '0 Celsius'],
    correct: 1,
  },
  {
    question: 'do i like pickles?',
    answers: ['yes', 'no', 'what a stupid question', 'dont know'],
    correct: 1,
  },
  {
    question: 'what is a tomato?',
    answers: ['vegetable', 'herb', 'berry', 'fruit'],
    correct: 3,
  },
];

export async function getRandomQuizzes(numberOfQuizzes) {
  if (numberOfQuizzes < 1) throw "Invalid number of requested quizzes: " + n;

  const url =
    "https://opentdb.com/api.php?type=multiple&amount=" + numberOfQuizzes;
  let response;
  let payload;

  try {
    response = await fetch(url);
    payload = await response.json();
  } catch (err) {
    return null;
  }

  if (response.status !== 200) {
    return null;
  }

  return payload.results.map((q) => {
    const correct = Math.floor(Math.random() * Math.floor(3));
    const answers = q.incorrect_answers;
    answers.splice(correct, 0, q.correct_answer);

    return {
      question: q.question,
      answers: answers,
      correct: correct,
    };
  });
}
