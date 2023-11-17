import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';

function App() {
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