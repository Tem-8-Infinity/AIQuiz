import { useEffect, useState } from "react";
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
  const { quizId } = useParams();
  // const [user,loading, error] = useAuthState(auth);
  const user = useUserStore((state) => state.user);
  const [quizDetails, setQuizDetails] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const quizRef = ref(db, `quizzes/${quizId}`);
    get(quizRef).then((snapshot) => {
      setQuizDetails(snapshot.val());
    });
  }, []);
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

  const handleEditQuiz = async (ev) => {
    // Implement the logic to create a quiz using quizDetails
    ev.preventDefault();
    await set(ref(db, `quizzes/${quizId}`), {
      ...quizDetails,
    });
    navigate(`/DisplayQuestionnaire/${quizId}`);
  };

  const categories = [
    "Books",
    "Movies",
    "Animals",
    "History",
    "Training",
    "Science",
    "Sport",
    "Education",
    "Anime",
    "Geography",
    "Math",
  ];
  const difficulty = ["Hard", "Medium", "Easy"];

  useEffect(() => {
  }, [quizDetails]);

  if (quizDetails === null) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={handleEditQuiz}>
      <div>
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h1>Create Quiz</h1>
            <div>
              <label>Category :</label>
              <select
                required
                name="category"
                value={quizDetails.quizCategory}
                onChange={handleInputChange}
                className="select select-bordered w-full mt-3"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
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
                <option disabled hidden value={""}>
                  Select difficulty
                </option>
                {difficulty.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Start Date :</label>
              <input
                required
                value={quizDetails.startDate}
                onChange={handleInputChange}
                min={new Date(Date.now()).toISOString().split("T")[0]}
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
                min={
                  new Date(
                    (new Date(quizDetails.startDate).valueOf() || Date.now()) +
                      24 * 3600 * 1000
                  )
                    .toISOString()
                    .split("T")[0]
                }
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
              <button
                className="!h-16 btn btn-primary text-lg mt-3 p-5"
                type="submit"
              >
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
