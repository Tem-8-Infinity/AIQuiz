import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import useUserStore from "./context/store";
import NavBar from "./components/NavBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./services/user.services";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, setUser } = useUserStore();
  const auth = getAuth();

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, update the Zustand store
        const { uid } = firebaseUser;
        getUserData(uid).then((userData) => {
          setUser(userData);
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/" /> : <Home />} />
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
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
