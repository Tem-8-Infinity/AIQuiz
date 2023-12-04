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
  const category = state?.category; // This will be undefined if no category is passed

  useEffect(() => {
    if (user) {
      getAllQuizzes().then((data) => {
        if (category) {
          setQuizzes(
            data.filter(
              (q) =>
                (q.quizCategory === category ||
                  category === "All Categories") &&
                "questions" in q &&
                q.questions.length > 0
            )
          );
        } else {
          setQuizzes(
            data.filter((q) => "questions" in q && q.questions.length > 0)
          );
        }
      });
    }
  }, [user, category]);

  if (!user) return null;

  const startQuiz = (quiz) => {
    navigate(`/StartQuiz/quiz/${quiz.id}`, { state: { quiz } });
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const selectBadgeColor = (quizDifficulty) => {
    return quizDifficulty === "Hard"
      ? "bg-red-600"
      : quizDifficulty === "Medium"
      ? "bg-orange-600"
      : "bg-green-800";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 ">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="card bg-neutral text-neutral-content"
        >
          <div className="card-body">
            <h2 className="card-title">
              {decodeHtml(quiz.quizName)}{" "}
              <div
                className={`badge badge-secondary ${selectBadgeColor(
                  quiz.quizDifficulty
                )}`}
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
              className="btn border-none bg-blue-400 w-28 mx-auto"
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

export default DisplayQuizes;
