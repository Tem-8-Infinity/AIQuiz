import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import {
  storeDataInResult,
  storeQuizResult,
} from "../../services/quiz.services";
import {
  addCompletedQuiz,
  getUserNameByUserId,
} from "../../services/user.services";

const QuizResults = () => {
  const { state } = useLocation();
  const { quiz, userAnswers } = state;
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  let correctAnswersCount = 0;
  let points = 0;

  quiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswersCount++;
      points += question.points;
    }
  });

  // Calculate the points and success rate
  const totalPoints = quiz.questions.reduce(
    (sum, question) => sum + (question.points || 0),
    0
  );
  const successRate = (correctAnswersCount / quiz.questions.length) * 100;

  // Save results and mark quiz as completed
  useEffect(() => {
    if (user) {
      storeQuizResult(user.uid, quiz.id, points);
      addCompletedQuiz(user.uid, quiz.id);

      getUserNameByUserId(user.uid).then((username) => {
        const score = {
          score: points,
          timeTaken: 80,
          userID: user.uid,
          username,
        };

        storeDataInResult(quiz.id, score);
      });
    }
  }, [user, quiz.id, points]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
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
                className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                title={question.correctAnswer}
              >
                Hover to see the correct answer
              </span>
            )}
          </p>
        </div>
      ))}
      <div className="mt-6">
        <p>
          Total Points: {points} out of {totalPoints}
        </p>
        <p>Success Rate: {successRate.toFixed(2)}%</p>
        <button className="btn btn-primary mt-4" onClick={handleGoBack}>
          Go Back to Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
