import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { storeDataInResult } from "../../services/quiz.services";
import {
  addCompletedQuiz,
  getUserNameByUserId,
} from "../../services/user.services";

const StartQuiz = () => {
  const [user] = useAuthState(auth);
  const { state } = useLocation();
  const quiz = state.quiz;
  quiz["questions"] = Object.values(quiz.questions || {a:[]});

  const maxDurationInMinutes = parseInt(quiz.maxDuration, 10);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(maxDurationInMinutes);
  const [userAnswers, setUserAnswers] = useState({});
  const [isRunning, setIsRunning] = useState(true);
  const [options,setOptions] = useState([[]]);
  const navigate = useNavigate();
  let timer;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        if (minutesLeft === 0 && secondsLeft === 0) {
          clearInterval(timer);
          finishQuiz();
          return;
        }

        if (secondsLeft === 0) {
          setMinutesLeft((minutesLeft) => minutesLeft - 1);
          setSecondsLeft(59);
        } else {
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [secondsLeft, minutesLeft, isRunning]);
  
  useEffect(() => {
    console.log(quiz);
    setIsRunning(true);
    setOptions(quiz.questions.map(q=>shuffle([...q.incorrectAnswers, q.correctAnswer])))
  }, []);

  const finishQuiz = () => {
    const totalTimeSpent =
      maxDurationInMinutes * 60 - (minutesLeft * 60 + secondsLeft);
    const timeTakenMinutes = Math.floor(totalTimeSpent / 60);
    const timeTakenSeconds = totalTimeSpent % 60;
    const formattedTimeTaken = `${timeTakenMinutes
      .toString()
      .padStart(2, "0")}:${timeTakenSeconds.toString().padStart(2, "0")}`;

    let points = 0;

    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        points += question.points;
      }
    });

    
    if(user){getUserNameByUserId(user.uid).then((username) => {
      addCompletedQuiz(user.uid, quiz.id);
      const score = {
        score: points,
        timeTaken: formattedTimeTaken,
        userID: user.uid,
        username,
      };

      storeDataInResult(quiz.id, score);
    })}else{
      console.log(points);
      const score = {
        score: points,
        timeTaken: formattedTimeTaken,
        userID: "",
        username: "",
      };
      storeDataInResult(quiz.id, score);
    }

    navigate("/QuizResults", {
      state: { quiz, userAnswers, timeTaken: formattedTimeTaken },
    });
  };

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (Object.keys(userAnswers).length < quiz.questions.length) {
      toast.error("All questions must be answered.");
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const question = quiz.questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max place-self-center">
          <div className="flex flex-col  p-2 bg-gradient-to-br from-teal-400 to-teal-100 font-bold rounded-box text-black">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": minutesLeft }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box bg-gradient-to-br from-teal-400 to-teal-100 font-bold text-black">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": secondsLeft }}></span>
            </span>
            sec
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">{decodeHtml(question?.question)}</h2>
          <div className="space-y-2">
            {options[currentQuestionIndex].map(
              (answer, index) => (
                <button
                  key={index}
                  className={`btn btn-block ${
                    currentAnswer === answer ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => handleAnswer(answer)}
                >
                  {decodeHtml(answer)}
                </button>
              )
            )}
          </div>
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-primary bg-blue-400"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              style={{ border: "none" }}
            >
              Previous Question
            </button>
            <button
              className="btn btn-primary bg-blue-400"
              onClick={handleNextQuestion}
              style={{ border: "none" }}
            >
              {currentQuestionIndex === quiz.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
  
  // Pick a remaining element.
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;
  
  // And swap it with the current element.
  [array[currentIndex], array[randomIndex]] = [
  array[randomIndex], array[currentIndex]];
  }
  
  return array;
  }

export default StartQuiz;
