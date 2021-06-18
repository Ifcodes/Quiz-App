import { useState, useEffect } from "react";
import "./App.css";
import Questions from "./components/questions";
import FinalResult from "./components/Result";
import axios from "axios";
import fb from "./images/043-facebook-1.png";
import twt from "./images/013-twitter-1.png";
import inst from "./images/034-instagram.png";

function App() {
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
      .then((response) => {
        console.log(response);
        setQuestions(response.data.results);
        setResult(0);
      });
  }, []);

  return (
    <div className="App">
      <div className="intro">
        <header>
          <h2>Quizpie</h2>
          <div className="socio-icons">
            <div>
              <img src={fb} alt="facebook" />
            </div>
            <div>
              <img src={twt} alt="twitter" />
            </div>
            <div>
              <img src={inst} alt="instagram" />
            </div>
          </div>
        </header>
        <div className="intro-cont">
          <h3>
            A broad spectrum of quizes to test your how much you know about
            computer and computer science!!
          </h3>
          <span>
            This quiz helps you with some basics knowledge required for any
            aspiring software developer. Happy Hacking.
          </span>
        </div>
      </div>
      <div className="question-cont">
        <Questions
          questions={questions}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          result={result}
          setResult={setResult}
          answer={answer}
          setAnswer={setAnswer}
        />
        {questionIndex === 10 && (
          <FinalResult
            setQuestionIndex={setQuestionIndex}
            result={result}
            questionIndex={questionIndex}
            setResult={setResult}
            setQuestions={setQuestions}
          />
        )}
      </div>
    </div>
  );
}

export default App;
