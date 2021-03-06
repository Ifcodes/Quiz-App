import React, { useState } from "react";
import checkIcon from "../images/icons8-checkmark.gif";
import wrongIcon from "../images/icons8-cross-mark-48.png";

const Questions = ({
  questions,
  questionIndex,
  setSelectedOption,
  selectedOption,
  setQuestionIndex,
  answers,
  setAnswer,
  result,
  setResult,
  correctOption,
  setCorrectOption,
}) => {
  const [selected, setSelected] = useState(false);
  const [notification, setNotification] = useState("");

  const correctAns = questions
    .map(
      (question, index) => index === questionIndex && question.correct_answer
    )
    .filter((answer) => answer !== false);

  const incorrectAns = questions
    .map(
      (question, index) => index === questionIndex && question.incorrect_answers
    )
    .filter((answer) => answer !== false);

  const concatAns = [...correctAns, ...incorrectAns];

  const allAnswers = concatAns.flat();

  const handleAnswerClick = (ans, selection) => {
    setSelected(true);

    if (correctAns.join() === ans) {
      setCorrectOption(ans);
      setAnswer(selection);
      setNotification("Correct!");
    } else {
      setAnswer("");
      setCorrectOption("");
      setNotification("Wrong!");
    }
    setTimeout(() => {
      setNotification("");
    }, 2000);
    setSelectedOption(selection);

    return ans;
  };

  const handleResult = () => {
    return correctOption && setResult(result + 1);
  };
  return (
    <>
      {notification && (
        <span
          className={`notification ${
            notification === "Correct!" ? "cNote" : "wNote"
          }`}
        >
          {notification}
        </span>
      )}

      {questionIndex < 10 && (
        <h3 className="questionNums">Questions {questionIndex + 1} of 10</h3>
      )}
      <h3>
        {questions.map(
          (question, index) => index === questionIndex && question.question
        )}
      </h3>
      {allAnswers.sort().map((answer, index) => {
        return (
          <div
            disabled={selected ? true : false}
            key={`newKey${index}`}
            onClick={() => {
              handleAnswerClick(answer, index);
              // handleSingleClick();
            }}
            className={`answers ${
              answers === index
                ? "correctAns"
                : selectedOption === index
                ? "selectedOption"
                : " "
            }`}
          >
            <span>{answer}</span>
            {answers === index ? (
              <img src={checkIcon} alt="checkIcon" className="tick-icon" />
            ) : selectedOption === index ? (
              <img src={wrongIcon} alt="wrongIcon" className="tick-icon" />
            ) : (
              " "
            )}
          </div>
        );
      })}
      {questionIndex < 10 && (
        <div className="btn">
          <button
            onClick={() => {
              handleResult();
              setQuestionIndex(questionIndex + 1);
              setSelectedOption(false);
              setAnswer("");
              setSelected(false);
            }}
            disabled={questionIndex === 10 || !selected ? true : false}
            className={
              questionIndex === 9 ? "submit-color" : "nav-btn next-btn"
            }
          >
            {questionIndex === 9 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default Questions;
