import React from "react";
import { IQuiz } from "../pages/match";

interface props {
  quiz: IQuiz;
  handleClick: (x: number) => Promise<void>;
}

const Quiz = ({ quiz: { question, answers }, handleClick }: props) => {
  const renderAnswerTag = (prefix: string, answer: string, correct: number) => (
    <button className="answer" onClick={() => handleClick(correct)}>
      {prefix + answer}
    </button>
  );
  return (
    <>
      <div>
        <p className="question"> Question: {question} </p>
        <div className={"quizContainer"}>
          {renderAnswerTag("A: ", answers[0], 0)}
          {renderAnswerTag("B: ", answers[1], 1)}
          {renderAnswerTag("C: ", answers[2], 2)}
          {renderAnswerTag("D: ", answers[3], 3)}
        </div>
      </div>
    </>
  );
};

export default Quiz;
