import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import DisplayQuizes from "./components/DisplayQuizes/DisplayQuizes";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import QuizResults from "./components/QuizResults/QuizResults";
import useUserStore from "./context/store";
import NavBar from "./components/NavBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./services/user.services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import PrivateHome from "./components/PrivateHome/PrivateHome";
import CreateQuestionnaire from "./components/CreateQuestionnaire/CreateQuestionnaire";

function App() {
  const { user, setUser } = useUserStore();
  const auth = getAuth();
  const [firebaseUser, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid } = firebaseUser;
        getUserData(uid).then((userData) => {
          setUser(userData);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={firebaseUser ? <PrivateHome /> : <Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Profile"
          element={
            <AuthenticatedRoute>
              <ProfilePage />
            </AuthenticatedRoute>
          }
        />
        <Route path="/createQuiz" element={<CreateQuiz />} />
        <Route
          path="/StartQuiz/quiz/:id"
          element={
            <AuthenticatedRoute>
              <StartQuiz />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/QuizResults"
          element={
            <AuthenticatedRoute>
              <QuizResults />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/DisplayQuizes"
          element={
            <AuthenticatedRoute>
              <DisplayQuizes />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/CreateQuestionnaire/:quizId"
          element={
            <AuthenticatedRoute>
              <CreateQuestionnaire />
            </AuthenticatedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
