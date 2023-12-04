import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTopPerformers } from '../../services/quiz.services';

const Dashboard = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const { state } = useLocation();
  const { quiz } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz) {
      getTopPerformers(quiz.id).then(setTopPerformers);
    }
  }, [quiz]);

  const beginQuiz = () => {
    navigate(`/StartQuiz/quiz/${quiz.id}`, { state: { quiz } });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top Performers for {quiz?.quizName}</h2>
      <ol className="list-decimal pl-5 mb-4">
        {topPerformers.map((performer, index) => (
          <li key={index} className="mb-2">{performer.username}: {performer.score}</li>
        ))}
      </ol>
      <button className="btn btn-primary" onClick={beginQuiz}>
        Begin Quiz
      </button>
    </div>
  );
};

export default Dashboard;
