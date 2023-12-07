import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../services/quiz.services";
import { getCompletedQuizzes } from "../../services/user.services";


const DisplayQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category;

  useEffect(() => {
    if (user) {
      // Fetches completed quizzes for the user
      getCompletedQuizzes(user.uid).then(setCompletedQuizzes);
      // Fetches all quizzes
      getAllQuizzes().then((data) => {
        const filteredQuizzes = category
          ? data.filter(
              (quiz) =>
                quiz.quizCategory === category || category === "All Categories"
            )
          : data;
        setQuizzes(filteredQuizzes);
      });
    }
  }, [user, category]);

  const startQuiz = (quiz) => {
    // Checks if the user has completed this specific quiz
    if (completedQuizzes.includes(quiz.id)) {
      alert("You have already completed this quiz.");
      return;
    }
    // If not completed, the user is redirected/navigated to the quiz
    navigate(`/Dashboard/${quiz.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 font-bold">
      {quizzes.map((quiz, index) => (
        <div key={index} className="card bg-border shadow-md rounded bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold">
          <div className="card-body text-black">
            <h2 className="card-title">
              {quiz.quizName}
              <div
                className={`badge ${selectBadgeColor(quiz.quizDifficulty)}`}
                style={{ border: "none", padding: "3%", marginBottom: 4 }}
              >
                {quiz.quizDifficulty}
              </div>
            </h2>
            <p>Created by: {quiz.createdBy}</p>
            <p>Category: {quiz.quizCategory}</p>
            <p>Duration: {quiz.duration}</p>
            <p>End Date: {new Date(quiz.endDate).toLocaleString()}</p>
            <button
              disabled={quiz?.results.some((r) => r.userID === user.uid)}
              className={`btn border-none bg-blue-400 w-28 mx-auto font-bold text-black${
                completedQuizzes.includes(quiz.id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => startQuiz(quiz)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const selectBadgeColor = (difficulty) => {
  return difficulty === "Hard"
    ? "badge-secondary bg-red-600"
    : difficulty === "Medium"
    ? "badge-secondary bg-orange-600"
    : "badge-secondary bg-green-800";
};

export default DisplayQuizes;
