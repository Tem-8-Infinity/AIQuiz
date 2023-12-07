import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, getTopPerformers } from "../../services/quiz.services";

const Dashboard = () => {
  const [quiz, setQuiz] = useState({});
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const quiz = await getQuizById(quizId);
      setQuiz(quiz);
    };

    fetchData();
  }, []);

  const beginQuiz = () => {
    navigate(`/StartQuiz/quiz/${quiz.id}`, { state: { quiz } });
  };

  return (
    <div className="container mx-auto p-4 border shadow-md rounded bg-gradient-to-br from-violet-400 to-teal-200 font-bold">
      <div className="flex">
        <h2 className="text-2xl font-bold mb-4">{quiz?.quizName}</h2>
        <div
          className={`badge ${_selectBadgeColor(quiz.quizDifficulty)} ml-5`}
          style={{ border: "none", padding: "1rem", marginBottom: 4 }}
        >
          {quiz.quizDifficulty}
        </div>
      </div>

      <p>StartDate: {new Date(quiz.startDate).toLocaleDateString()}</p>

      <h4 className="text-2xl font-bold mb-4">Quiz Results</h4>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Points</th>
              <th>Time taken</th>
            </tr>
          </thead>
          <tbody>
            {quiz?.results &&
              quiz?.results
                .sort((a, b) => b.score - a.score)
                .map((r, i) => _resultToTableRow(r, i))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary text-white bg-violet-600 border-none" onClick={beginQuiz}>
        Begin Quiz
      </button>
    </div>
  );
};

const _resultToTableRow = (quizResult, index) => {
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <th>{quizResult.username}</th>
      <th>{quizResult.score}</th>
      <th>{quizResult.timeTaken}</th>
    </tr>
  );
};

const _selectBadgeColor = (difficulty) => {
  return difficulty === "Hard"
    ? "badge-secondary bg-red-600"
    : difficulty === "Medium"
    ? "badge-secondary bg-orange-600"
    : "badge-secondary bg-green-800";
};

export default Dashboard;
