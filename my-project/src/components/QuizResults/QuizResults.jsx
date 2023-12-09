import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResults = () => {
  const { state } = useLocation();
  const { quiz, userAnswers, timeTaken } = state;

  const navigate = useNavigate();
  let correctAnswersCount = 0;
  let points = 0;

  quiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswersCount++;
      points += question.points;
    }
  });

  const totalPoints = quiz.questions.reduce(
    (sum, question) => sum + (question.points || 0),
    0
  );
  const successRate = (correctAnswersCount / quiz.questions.length) * 100;

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 font-bold">
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p>{question.question}</p>
          <p
            style={{
              color:
                userAnswers[index] === question.correctAnswer ? "green" : "red",
            }}
          >
            Your Answer: {userAnswers[index]}
            {userAnswers[index] !== question.correctAnswer && (
              <span
                className="ml-2 text-black hover:text-black cursor-pointer font-bold"
                title={question.correctAnswer}
              >
                Hover to see the correct answer
              </span>
            )}
          </p>
        </div>
      ))}
      <div className="mt-6">
        <p>Time Taken: {timeTaken}</p>
        <p>
          Total Points: {points} out of {totalPoints}
        </p>
        <p>Success Rate: {successRate.toFixed(2)}%</p>
        <button
          className="btn btn-primary mt-4 font-bold"
          onClick={handleGoBack}
        >
          Go Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
