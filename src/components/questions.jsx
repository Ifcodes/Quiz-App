import React from "react";
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
  const correctAns = questions
    .map(
      (question, index) => index === questionIndex && question.correct_answer
    )
    .filter((answer) => answer !== false);
  console.log(correctAns.join());
  const incorrectAns = questions
    .map(
      (question, index) => index === questionIndex && question.incorrect_answers
    )
    .filter((answer) => answer !== false);

  const concatAns = [...correctAns, ...incorrectAns];

  const allAnswers = concatAns.flat();

  const handleAnswerClick = (ans, selection) => {
    if (correctAns.join() === ans) {
      setCorrectOption(ans);
      setAnswer(selection);
    } else {
      setCorrectOption("");
      setAnswer("");
    }
    setSelectedOption(selection);
    return ans;
  };

  const handleResult = () => {
    return correctOption && setResult(result + 1);
  };
  return (
    <>
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
            key={`newKey${index}`}
            onClick={() => handleAnswerClick(answer, index)}
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
            onClick={() => setQuestionIndex(questionIndex - 1)}
            className="nav-btn back-btn"
          >
            Back
          </button>
          <button
            onClick={() => {
              handleResult();
              console.log(result);
              setQuestionIndex(questionIndex + 1);
              setSelectedOption(false);
              setAnswer("");
            }}
            disabled={questionIndex === 10}
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
