import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { getAllQuizzes } from "../../services/quiz.services";
import { getCompletedQuizzes } from "../../services/user.services";
import { toast } from "react-toastify";

const DisplayQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const today = new Date();

  useEffect(() => {
    if (user) {
      getCompletedQuizzes(user.uid).then((completedQuizResults) => {
        const completedQuizIds = completedQuizResults.map(result => result.quizId);
        setCompletedQuizzes(completedQuizIds);
      });
      getAllQuizzes().then((data) => {
        setQuizzes(data);
      });
    }
  }, [user]);

  const startQuiz = (quiz) => {
    if (!isQuizAccessible(quiz)) {
      toast.error("This quiz is not available.");
      return;
    }
    navigate(`/Dashboard/${quiz.id}`);
  };

  const filterQuizzes = (filterType) => {
    let filtered = quizzes;
    switch (filterType) {
      case "Completed Quizzes":
        filtered = quizzes.filter(quiz => completedQuizzes.includes(quiz.id));
        break;
      case "Coming Soon":
        filtered = quizzes.filter(quiz => new Date(quiz.startDate) > today);
        break;
      case "Ongoing":
        filtered = quizzes.filter(quiz => new Date(quiz.startDate) <= today && new Date(quiz.endDate) >= today && !completedQuizzes.includes(quiz.id));
        break;
      case "Finished":
        filtered = quizzes.filter(quiz => new Date(quiz.endDate) < today);
        break;
      default:
        break;
    }
    setFilteredQuizzes(filtered);
  };

  const isQuizAccessible = (quiz) => {
    return !completedQuizzes.includes(quiz.id) && new Date(quiz.startDate) <= today && new Date(quiz.endDate) >= today;
  };

  return (
    <div>
      <div className="join">
        <input className="cat__card join-item btn bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold" type="radio" name="options" aria-label="Completed Quizzes" onClick={() => filterQuizzes("Completed Quizzes")} />
        <input className="cat__card join-item btn bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold" type="radio" name="options" aria-label="Coming Soon" onClick={() => filterQuizzes("Coming Soon")} />
        <input className="cat__card join-item btn bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold" type="radio" name="options" aria-label="Ongoing" onClick={() => filterQuizzes("Ongoing")} />
        <input className="cat__card join-item btn bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold" type="radio" name="options" aria-label="Finished" onClick={() => filterQuizzes("Finished")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 font-bold">
        {filteredQuizzes.map((quiz, index) => (
          <div key={index} className="card bg-border shadow-md rounded bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold">
            <div className="card-body text-black">
              <h2 className="card-title">{quiz.quizName}</h2>
              <p>Created by: {quiz.createdBy}</p>
              <p>Category: {quiz.quizCategory}</p>
              <p>Duration: {quiz.maxDuration} minutes</p>
              <p>Total points: {quiz.maximumPoints} points</p>
              <p>Total questions: {quiz.questions ? Object.keys(quiz.questions).length : 0}</p>
              <p>Start Date: {new Date(quiz.startDate).toLocaleString()}</p>
              <p>End Date: {new Date(quiz.endDate).toLocaleString()}</p>
              <button
                disabled={!isQuizAccessible(quiz)}
                className={`btn border-none bg-blue-400 w-28 mx-auto text-black font-bold ${!isQuizAccessible(quiz) ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => startQuiz(quiz)}
              >
                {isQuizAccessible(quiz) ? "Start Quiz" : "Not Available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayQuizes;