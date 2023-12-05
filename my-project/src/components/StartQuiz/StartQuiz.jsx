import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const { state } = useLocation();
  const { quiz } = state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (Object.keys(userAnswers).length < quiz.questions.length) {
        alert("Please answer all questions before proceeding.");
        return;
      }
      navigate("/QuizResults", { state: { quiz, userAnswers } });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const question = quiz.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{decodeHtml(question?.question)}</h2>
          <div className="space-y-2">
            {[...question?.incorrectAnswers, question?.correctAnswer].map(
              (answer, index) => (
                <button
                  key={index}
                  className={`btn btn-block ${
                    currentAnswer === answer ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => handleAnswer(answer)}
                >
                  {decodeHtml(answer)}
                </button>
              )
            )}
          </div>
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-primary bg-blue-400"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              style={{ border: "none" }}
            >
              Previous Question
            </button>
            <button
              className="btn btn-primary bg-blue-400"
              onClick={handleNextQuestion}
              style={{ border: "none" }}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
