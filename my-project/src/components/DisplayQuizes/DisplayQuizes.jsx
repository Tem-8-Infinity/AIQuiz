import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAllQuizzes } from "../../services/quiz.services";
import { auth } from "../../config/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { category } = state;

  useEffect(() => {
    if (user) {
      getAllQuizzes().then((data) =>
        setQuizzes(
          data.filter(
            (q) =>
              q.quizCategory === category &&
              "questions" in q &&
              q.questions.length > 0
          )
        )
      );
    }
  }, [user]);

  if (!user) return null; // or redirect to login page

  const startQuiz = (quiz) => {
    navigate(`/StartQuiz/quiz/${quiz.id}`, { state: { quiz } });
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="card bg-neutral text-neutral-content bg-ora"
        >
          <div className="card-body">
            <h2 className="card-title">
              {decodeHtml(quiz.quizName)}{" "}
              <div
                className={`badge badge-secondary ${selectBadgeColor(
                  quiz.quizDifficulty
                )}`}
                style={{ border: "none", padding: "3%" }}
              >
                {quiz.quizDifficulty}
              </div>
            </h2>
            <p>Created by: {quiz.createdBy}</p>
            <p>Category: {quiz.quizCategory}</p>
            <p>Duration: {quiz.duration}</p>
            <p>End Date: {new Date(quiz.endDate).toLocaleString()}</p>
            <button
              className="btn btn-primary"
              onClick={() => startQuiz(quiz)}
              style={{ maxWidth: "50%", margin: "auto", marginTop: "8%" }}
            >
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const selectBadgeColor = (quizDifficulty) => {
  return quizDifficulty === "Hard"
    ? "bg-red-600"
    : quizDifficulty === "Medium"
    ? "bg-orange-600"
    : "bg-green-800";
};

export default DisplayQuizes;
