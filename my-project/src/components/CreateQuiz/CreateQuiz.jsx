import React, { useState } from 'react';
import { Input, Button, Select } from 'daisyui';
import { Link } from 'react-router-dom';

const CreateQuizPage = () => {
    const [quizDetails, setQuizDetails] = useState({
      category: '',
      title: '',
      timer: '',
      isPrivate: false,
    });
  
    const handleInputChange = (key, value) => {
      setQuizDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    };
  
    const handleCreateQuiz = () => {
      // Implement the logic to create a quiz using quizDetails
      console.log('Quiz Created:', quizDetails);
    };
  
    return (
      <div>
        <h1>Create Quiz</h1>
        <div>
          <label>Category:</label>
          <Select
            options={['Category 1', 'Category 2', 'Category 3']}
            value={quizDetails.category}
            onChange={(value) => handleInputChange('category', value)}
          />
        </div>
        <div>
          <label>Title:</label>
          <Input
            type="text"
            value={quizDetails.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>
        <div>
          <label>Timer:</label>
          <Input
            type="text"
            value={quizDetails.timer}
            onChange={(e) => handleInputChange('timer', e.target.value)}
          />
        </div>
        <div>
          <label>Private:</label>
          <input
            type="checkbox"
            checked={quizDetails.isPrivate}
            onChange={() =>
              handleInputChange('isPrivate', !quizDetails.isPrivate)
            }
          />
        </div>
        <div>
          <Button onClick={handleCreateQuiz}>Create Questionnaire</Button>
        </div>
        <div>
          <Link to="/other-page">Other Page</Link>
        </div>
      </div>
    );
  };
  
  export default CreateQuizPage;
  