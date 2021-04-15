import React, { ReactElement, useEffect, useState } from "react";
import Quiz from "../components/quiz";
import LoadingView from "../components/LoadingView";
import { fetchJson, HttpException, postJson, postReq } from "../lib/http";
import { ErrorView } from "../components/errorView";

export interface IQuiz {
  answers: string[];
  question: string;
}

export const Match = (): ReactElement => {
  const [victory, setVictory] = useState(false);
  const [error, setError] = useState<HttpException | null>(null);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [defeat, setDefeat] = useState(false);

  useEffect(() => {
    starGame();
  }, []);
  const starGame = async () => {
    setError(null);
    setQuiz(null);
    setVictory(false);
    setDefeat(false);
    try {
      await postReq("/api/matches");
      const { currentQuiz } = await fetchJson("/api/matches/ongoing");
      setQuiz(currentQuiz);
    } catch (e) {
      setError(e);
    }
  };

  const handleClick = async (x: number): Promise<void> => {
    try {
      const data = await postJson("/api/matches/ongoing", { answer: x });
      setVictory(data.victory);
      setDefeat(data.defeat);
      setQuiz(data.currentQuiz);
    } catch (e) {
      setError(e);
    }
  };

  if (error) {
    return <ErrorView error={error} />;
  }

  if (victory) {
    return (
      <div>
        <h2>You Won!</h2>
        <div>
          <button className="quiz" onClick={starGame}>
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
          <button className={"quiz"} onClick={starGame}>
            New Match
          </button>
        </div>
      </div>
    );
  }
  if (quiz) return <Quiz quiz={quiz} handleClick={handleClick} />;

  return <LoadingView />;
};
