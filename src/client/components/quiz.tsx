import React from "react";
import { IQuiz } from "../pages/match";

interface props {
  quiz: IQuiz;
  handleClick: (x: boolean) => void;
}

const Quiz = ({ quiz: { question, answers, correct }, handleClick }: props) => {
  const renderAnswerTag = (
    prefix: string,
    answer: string,
    correct: boolean
  ) => (
    <button className="answer" onClick={() => handleClick(correct)}>
      {prefix + answer}
    </button>
  );
  return (
    <>
      <div>
        <p className="question"> Question: {question} </p>
        <div className={"quizContainer"}>
          {renderAnswerTag("A: ", answers[0], correct === 0)}
          {renderAnswerTag("B: ", answers[1], correct === 1)}
          {renderAnswerTag("C: ", answers[2], correct === 2)}
          {renderAnswerTag("D: ", answers[3], correct === 3)}
        </div>
      </div>
    </>
  );
};

export default Quiz;
