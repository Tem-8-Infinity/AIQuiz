import { useEffect, useState } from "react";
import { createQuiz } from "../../services/quiz.services";
import {
  Routes,
  Route,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";
import { useFormik } from "formik";

const CreateQuiz = () => {
  const [quizDetails, setQuizDetails] = useState({
    category: "Categories",
    title: "",
    timer: "",
    isPrivate: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      //evt.target.name = category
      [evt.target.name]: evt.target.value,
    }));
  };

  const handlePrivacyChange = (isPrivate) => {
    setQuizDetails((prevDetails) => ({
      ...prevDetails,
      isPrivate: isPrivate,
    }));
  };

  const handleCreateQuiz = async () => {
    // Implement the logic to create a quiz using quizDetails
    console.log("Quiz Created:", quizDetails);
    const key = await createQuiz(
      "Bob",
      quizDetails.isPrivate,
      quizDetails.category,
      "hard",
      quizDetails.timer,
      quizDetails.title
    ); //createdBy,isPrivate,quizCategory,quizDifficulty, quizDuration, quizName
    navigate(`/DisplayQuestionnaire/${key}`);
  };

  const categories = ["Categories", "Books", "Films", "Animals", "History"];

  useEffect(() => {
    console.log(quizDetails);
  }, [quizDetails]);

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1>Create Quiz</h1>
          <div>
            <label>Category :</label>
            <select
              name="category"
              value={quizDetails.category}
              onChange={handleInputChange}
              className="select select-bordered w-full max-w-xs"
            >
              {categories.map((category, index) => (
                <option key={category} disabled={index === 0}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Title :</label>
            <input
              value={quizDetails.title}
              onChange={handleInputChange}
              name="title"
              type="text"
              placeholder="Title of the quiz"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label>Timer :</label>
            <input
              value={quizDetails.timer}
              onChange={handleInputChange}
              name="timer"
              type="number"
              placeholder="Set quiz timer"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label>Start Date :</label>
            <input
              value={quizDetails.timer}
              onChange={handleInputChange}
              name="startDate"
              type="date"
              placeholder="Set start date"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label>End Date :</label>
            <input
              value={quizDetails.timer}
              onChange={handleInputChange}
              name="endDate"
              type="date"
              placeholder="Set end date"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <button
              className={`btn ${
                quizDetails.isPrivate ? "btn-outline" : "btn-primary"
              }`}
              onClick={() => handlePrivacyChange(false)}
            >
              Open
            </button>
            <button
              className={`btn ${
                quizDetails.isPrivate ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handlePrivacyChange(true)}
            >
              Private
            </button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleCreateQuiz}>
              Display Questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
