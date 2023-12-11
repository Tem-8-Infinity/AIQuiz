import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config';
import { equalTo, get, orderByChild, query, ref, remove } from 'firebase/database';
import useUserStore from '../../context/store';
import { useNavigate } from 'react-router-dom';

const selectBadgeColor = (difficulty) => {
    return difficulty === "Hard"
      ? "badge-secondary bg-red-600"
      : difficulty === "Medium"
      ? "badge-secondary bg-orange-600"
      : "badge-secondary bg-green-800";
  };
  
const QuizzesList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const user = useUserStore((state) => state.user);
    const [filter,setFilter] = useState(false); 
    const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
    return;
    }
    console.log(user);
    const quizRef = ref(db, "quizzes");
    if(user.admin){
        get(quizRef).then(snapshot=>{
            console.log(snapshot.val());
            setQuizzes(Object.keys(snapshot.val()).map(key=>({
              id : key,
              ...snapshot.val()[key]
            })))
          })
          return;
    }
    const quizQuery = query(quizRef, orderByChild("createdBy"), equalTo(user.username));
    get(quizQuery).then(snapshot=>{
      console.log(snapshot.val());
      setQuizzes(Object.keys(snapshot.val()).map(key=>({
        id : key,
        ...snapshot.val()[key]
      })))
    })
},[user])
  return (
    <div>
        QuizzesList
        {user.admin && <button className={`btn btn-accent`} onClick={()=>{setFilter(!filter)}}>{filter ? 'Display only My quizzes' : 'Display All Quizzes'}</button>}
        {(filter ? quizzes.filter(quiz=>quiz.createdBy === user.username): quizzes).map((quiz, index) => (
        <div key={index} className="card bg-border shadow-md rounded bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold">
          <div>
          <button className="btn" onClick={()=>{
            navigate(`/EditQuiz/${quiz.id}`)
          }}>Edit</button>
          <button className="btn" onClick={async ()=>{
            const quizRef = ref(db, `quizzes/${quiz.id}`);
            await remove(quizRef);
            setQuizzes(quizzes.filter(q=>q.id !== quiz.id ))
          }}>Delete</button>
          </div>
          <div className="card-body text-black">
            <h2 className="card-title">
              {quiz.title}
              <div
                className={`badge ${selectBadgeColor(quiz.quizDifficulty)}`}
                style={{ border: "none", padding: "3%", marginBottom: 4 }}
              >
                {quiz.difficulty}
              </div>
            </h2>
            {console.log(quiz)}
            <p>Created by: {quiz.createdBy}</p>
            <p>Category: {quiz.category}</p>
            <p>Duration: {quiz.maxDuration}</p>
            <p>End Date: {new Date(quiz.endDate).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizzesList