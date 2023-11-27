import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAllQuizzes } from "../../services/quiz.services";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const PrivateHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getAllQuizzes().then(setQuizzes);
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
        <div key={index} className="card bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">{decodeHtml(quiz.createdBy)}</h2>
            <p>End Date: {new Date(quiz.endDate).toLocaleString()}</p>
            <ul>
              {quiz.questions &&
                quiz.questions.map((question, qIndex) => (
                  <li key={qIndex}>
                    <p>
                      Q{qIndex + 1}: {decodeHtml(question.question)}
                    </p>
                  </li>
                ))}
            </ul>
            <button className="btn btn-primary" onClick={() => startQuiz(quiz)}>
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrivateHome;
