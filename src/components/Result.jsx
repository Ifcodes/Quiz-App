import React from "react";
import axios from "axios";
import trophy from "../images/icons8-trophy.gif";
import saddy from "../images/download (1).png";

const FinalResult = ({
  setQuestionIndex,
  result,
  questionIndex,
  setResult,
  setQuestions,
}) => {
  const newQuiz = () => {
    return axios
      .get("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
      .then((response) => {
        console.log(response);
        setQuestions(response.data.results);
        setResult(0);
        setQuestionIndex(0);
      });
  };
  const percentage = `${(result / 10) * 100}`;
  return (
    <>
      <div className="finalResult">
        {percentage > 50 ? (
          <img src={trophy} alt="trophy" />
        ) : (
          <img src={saddy} alt="sad" />
        )}
        <h1>{percentage}%</h1>
        <h2>{percentage < 50 ? "Awwwn!!! Failed Quiz" : "Congratulations"}</h2>
        <p>
          You scored {result} out of {questionIndex}
        </p>
        <button
          onClick={() => {
            setQuestionIndex(0);
            setResult(0);
          }}
          className="retake-btn"
        >
          Re-take Questions
        </button>
        <br />
        <button onClick={() => newQuiz()} className="newQuiz">
          Take Another Quiz
        </button>
      </div>
    </>
  );
};

export default FinalResult;
