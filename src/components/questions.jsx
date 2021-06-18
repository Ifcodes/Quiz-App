import React from "react";

const Questions = ({
  questions,
  questionIndex,
  setSelectedOption,
  selectedOption,
  setQuestionIndex,
  answer,
  setAnswer,
  result,
  setResult,
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
      setAnswer(ans);
    }
    setSelectedOption(selection);
    return ans;
  };

  const handleResult = () => {
    return answer && setResult(result + 1);
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
          <div className="answers" key={`newKey${index}`}>
            <span
              key={index}
              onClick={() => handleAnswerClick(answer, index)}
              className={selectedOption === index ? "selectedOption" : " "}
            >
              {answer}
            </span>
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
