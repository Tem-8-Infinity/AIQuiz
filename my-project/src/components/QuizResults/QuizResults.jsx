import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResults = () => {
  const { state } = useLocation();
  const { quiz, userAnswers } = state;
  const navigate = useNavigate();
  const totalPoints = 300;
  let correctAnswersCount = 0;

  quiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswersCount++;
    }
  });

  const pointsPerQuestion = totalPoints / quiz.questions.length;
  const points = pointsPerQuestion * correctAnswersCount;
  const successRate = (correctAnswersCount / quiz.questions.length) * 100;

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p>{question.question}</p>
          <p style={{ color: userAnswers[index] === question.correctAnswer ? 'green' : 'red' }}>
            Your Answer: {userAnswers[index]}
            {userAnswers[index] !== question.correctAnswer && (
              <span className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer" title={question.correctAnswer}>
                Hover to see the correct answer
              </span>
            )}
          </p>
        </div>
      ))}
      <div className="mt-6">
        <p>Total Points: {points.toFixed(2)} out of {totalPoints}</p>
        <p>Success Rate: {successRate.toFixed(2)}%</p>
        <button className="btn btn-primary mt-4" onClick={handleGoBack}>Go Back to Quizzes</button>
      </div>
    </div>
  );
};

export default QuizResults;