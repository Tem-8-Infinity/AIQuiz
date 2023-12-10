import { useEffect, useState} from "react";
// import {useAuthState} from "react-firebase-hooks";
import { createQuiz } from "../../services/quiz.services";
import {
  Routes,
  Route,
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useFormik } from "formik";
import { auth, db } from "../../config/firebase-config";
import useUserStore from "../../context/store";
import { get, ref, set, update } from "firebase/database";

const EditQuiz = () => {
    const {quizId} = useParams();
    // const [user,loading, error] = useAuthState(auth);
    const user = useUserStore((state) => state.user);
    const [quizDetails, setQuizDetails] = useState({
        category: "Categories",
        title: "",
        maxDuration: "",
        isPrivate: false,
        type: "",//Open or Private
    });
    
    const navigate = useNavigate();
    useEffect(()=>{
        const quizRef = ref(db, `quizzesTest/${quizId}`)
        get(quizRef).then(snapshot=>{
            setQuizDetails(snapshot.val());
        })
    },[]);
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

  const handleCreateQuiz = async (ev) => {
    // Implement the logic to create a quiz using quizDetails
    ev.preventDefault();
    console.log("Quiz Created:", quizDetails);
    console.log(user);
     await set(ref(db, `quizzesTest/${quizId}`), {
        ...quizDetails,
    })
    navigate(`/DisplayQuestionnaire/${quizId}`);
  };

  const categories = ["Books", "Films", "Animals", "History"];
  const difficulty = ["Hard", "Medium", "Easy"];

  useEffect(() => {
    console.log(quizDetails);
  }, [quizDetails]);

  return (
    <form onSubmit={handleCreateQuiz}>
    <div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h1>Create Quiz</h1>
          <div>
            <label>Category :</label>
            <select
              required
              name="category"
              value={quizDetails.category}
              onChange={handleInputChange}
              className="select select-bordered w-full mt-3"
              >
              <option selected  value={""}>
                Categories
              </option>
              {categories.map((category, index) => (
                <option key={category} >
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Title :</label>
            <input
              required
              value={quizDetails.title}
              onChange={handleInputChange}
              name="title"
              type="text"
              placeholder="Title of the quiz"
              className="input input-bordered w-full mt-3 text-base"
            />
          </div>
          <div>
            <label>Timer :</label>
            <input
              required
              value={quizDetails.maxDuration}
              onChange={handleInputChange}
              name="maxDuration"
              type="number"
              min={1}
              placeholder="Set quiz timer"
              className="input input-bordered w-full max-w-xs ml-10 mt-3 "
            />
          </div>
          <div>
            <label>Difficulty :</label>
            
            <select
              required
              name="difficulty"
              value={quizDetails.difficulty}
              onChange={handleInputChange}
              className="select select-bordered w-full max-w-xs mt-3 ml-5"
              >
              <option selected disabled hidden value={""}>
                Select difficulty
              </option>
              {difficulty.map((d, index) => (
                <option key={d} >
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Start Date :</label>
            <input
             required
              value={quizDetails.startDate}
              onChange={handleInputChange}
              name="startDate"
              type="date"
              placeholder="Set start date"
              className="input input-bordered w-full max-w-xs ml-3 mt-2"
            />
          </div>
          <div>
            <label>End Date :</label>
            <input
              required
              value={quizDetails.endDate}
              onChange={handleInputChange}
              name="endDate"
              type="date"
              placeholder="Set end date"
              className="input input-bordered w-full max-w-xs ml-5 mt-1"
            />
          </div>
          <div>
            <button 
            type="button"
              className={`btn mr-3 text-base ${
                quizDetails.isPrivate ? "btn-outline" : "btn-primary"
              }`}
              onClick={() => handlePrivacyChange(false)}
            >
              Open
            </button>
            <button 
            type="button"
              className={`btn text-base  ${
                quizDetails.isPrivate ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handlePrivacyChange(true)}
            >
              Private
            </button>
          </div>
          <div>
            <button className="!h-16 btn btn-primary text-lg mt-3 p-5" type="submit">
              
              Display Questionnaire
              
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default EditQuiz;