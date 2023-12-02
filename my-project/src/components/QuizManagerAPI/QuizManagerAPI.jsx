import React, { useState, useEffect } from 'react';
import { getQuizQuestions } from '../../services/quizzes.services';


const QuizManager = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await getQuizQuestions(10); // Fetch 10 questions
      setQuestions(fetchedQuestions);
    };

    loadQuestions();
  }, []);

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions((prevQuestions) =>[...prevQuestions, { question: newQuestion }] );
      setNewQuestion('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        {questions.map((question, index) => (
          <div key={index} className="p-4 mb-2 border rounded">
            <p>{question.question}</p>
            <button 
              onClick={() => handleDeleteQuestion(index)}
              className="btn btn-error btn-sm">
              Delete Question
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
          className="input input-bordered w-full max-w-xs"
        />
        <button 
          onClick={handleAddQuestion}
          className="btn btn-primary ml-2">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default QuizManager;
