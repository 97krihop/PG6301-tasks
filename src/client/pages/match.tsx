import React, { ReactElement, useEffect, useState } from "react";
import Quiz from "../components/quiz";
import LoadingView from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { postJson } from "../lib/http";
import { Link } from "react-router-dom";

export interface IQuiz {
  answers: string[];
  question: string;
  correct: number;
}

export const Match = (): ReactElement => {
  const { data: quiz, loading, error, reload } = useLoading<IQuiz[]>(() =>
    postJson(" /api/matches")
  );
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    startGame();
  }, [loading]);

  const startGame = async () => {
    setVictory(false);
    setDefeat(false);
    setCurrent(0);
    setLength(quiz ? quiz.length : 0);
  };

  const handleClick = (x: boolean): void => {
    if (x) {
      if (current === length - 1) setVictory(true);
      else setCurrent(current + 1);
    } else setDefeat(true);
  };

  if (error) {
    if (error.status === 401) {
      return (
        <div>
          <h2>you are not logged in</h2>
          <Link to={"/login"}>
            <button>go to login page</button>
          </Link>
        </div>
      );
    }
    return <div>{error.toString()}</div>;
  }
  if (loading) return <LoadingView />;

  if (victory) {
    return (
      <div>
        <h2>You Won!</h2>
        <div>
          <button className="quiz" onClick={reload}>
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
          <button className={"quiz"} onClick={reload}>
            New Match
          </button>
        </div>
      </div>
    );
  }

  return <Quiz quiz={quiz![current]} handleClick={handleClick} />;
};
