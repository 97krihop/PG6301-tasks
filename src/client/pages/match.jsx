import React, { useEffect, useState } from 'react';
import Quiz from '../components/quiz';
import LoadingView from '../components/LoadingView';

export const Match = () => {
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState();
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => startGame(), []);

  const startGame = async () => {
    const quizzes = await fetchQuizzes(3);
    if (!quizzes) setError('Error when connecting to server');
    else {
      setError(null);
      setQuiz(quizzes);
      setVictory(false);
      setDefeat(false);
      setCurrent(0);
      setLength(quizzes.length);
    }
  };

  const fetchQuizzes = async (numberOfQuizzes) => {
    if (numberOfQuizzes < 1)
      throw 'Invalid number of requested quizzes: ' + numberOfQuizzes;

    let payload;

    try {
      const response = await fetch('/api/matches', { method: 'post' });
      if (response.status !== 201) return null;
      payload = await response.json();
    } catch (err) {
      return null;
    }

    return payload;
  };

  const handleClick = (x) => {
    if (x) {
      if (current === length - 1) setVictory(true);
      else setCurrent(current + 1);
    } else setDefeat(true);
  };

  if (error) return <h2>{error}</h2>;

  if (!quiz) return <LoadingView />;

  if (victory) {
    return (
      <div>
        <h2>You Won!</h2>
        <div>
          <button className='quiz' onClick={startGame}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  if (defeat) {
    return (
      <div>
        <h2>Wrong Answer! You Lost!</h2>
        <div>
          <button className={'quiz'} onClick={startGame}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      answers={quiz.answers}
      question={quiz.question}
      correct={quiz.correct}
      handleClick={handleClick}
    />
  );
};
