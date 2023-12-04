import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StartQuiz = () => {
  const { state } = useLocation();
  const { quiz } = state;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/QuizResults', { state: { quiz, userAnswers } });
    }
  };

  const question = quiz.questions[currentQuestionIndex];
   console.log(question);
   console.log(quiz)
  const currentAnswer = userAnswers[currentQuestionIndex];

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>{decodeHtml(question?.question)}</h2>
          <div className='space-y-2'>
            {[...question?.incorrectAnswers, question?.correctAnswer].map((answer, index) => (
              <button 
                key={index} 
                className={`btn btn-block ${currentAnswer === answer ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleAnswer(answer)}
              >
                {decodeHtml(answer)}
              </button>
            ))}
          </div>
          <div className='card-actions justify-end mt-4'>
            <button className='btn btn-primary' onClick={handleNextQuestion}>Next Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;