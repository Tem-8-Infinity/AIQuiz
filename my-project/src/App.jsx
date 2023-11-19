import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
//import useUserStore from './path-to-user-store/userStore';

function App() {
  // const setUser = useUserStore((state) => state.setUser);
  // useEffect(() => {
  //   // Check if user data is stored in localStorage
  //   const storedUserData = JSON.parse(localStorage.getItem('userData'));

  //   if (storedUserData) {
  //     setUser(storedUserData);
  //   }
  // }, [setUser]);

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;