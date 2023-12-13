import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase-config';
import { equalTo, get, orderByChild, query, ref, remove } from 'firebase/database';
import useUserStore from '../../context/store';
import { useNavigate } from 'react-router-dom';
import { selectBadgeColor } from '../../utils/selectBadgeColor';

  
const QuizzesList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const user = useUserStore((state) => state.user);
    const [filter,setFilter] = useState(true); 
    const navigate = useNavigate();
    const [search,setSearch] = useState('');
    const [filterQuiz,setFilterQuiz] = useState([])
  useEffect(()=>{
    if(!user){
    return;
    }
    console.log(user);
    const quizRef = ref(db, "quizzes");
    if(user.role === 'admin' || user.role === 'creator'){
        get(quizRef).then(snapshot=>{
            console.log(snapshot.val());
            setQuizzes(Object.keys(snapshot.val()).map(key=>({
              id : key,
              ...snapshot.val()[key]
            })))
            setFilterQuiz(Object.keys(snapshot.val()).map(key=>({
              id : key,
              ...snapshot.val()[key]
            })))
          })

          return;
    }
    // const quizQuery = query(quizRef, orderByChild("createdBy"), equalTo(user.username));
    // get(quizQuery).then(snapshot=>{
    //   console.log(snapshot.val());
    //   setQuizzes(Object.keys(snapshot.val()).map(key=>({
    //     id : key,
    //     ...snapshot.val()[key]
    //   })))
    // })
},[user])
  useEffect(()=>{
    if(search !== ''){
      setFilterQuiz(quizzes.filter(q=> q.quizName.toLowerCase().includes(search.toLowerCase())))
    }else{
      setFilterQuiz(quizzes)
    }
  },[search])
  return (
    <div className='bg-border bg-gradient-to-br from-teal-400 to-teal-10 p-2 min-h-screen'>
      <div className='flex items-center'>
        {user?.role === "admin" && <button className={`btn bg-gradient-to-br from-violet-400 to-teal-200 text-black font-bold border-none mb-3 m-4`} onClick={()=>{setFilter(!filter)}}>{filter ? 'Display All Quizzes' : 'Display only my Quizzes'}</button>}
        {quizzes.length === 0 ? (
          <div className='flex flex-col justify-center  text-center'> 
          <p className=''>  You have no quizzes yet ! </p>
          </div>
        ):(
          <div className="form-control mt-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered"
                  value = {search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
              </div>
        )}
        </div>
        {(filter ? filterQuiz.filter(quiz=>quiz.createdBy === user.username): filterQuiz).map((quiz, index) => (
        <div key={index} className="card bg-border shadow-md rounded bg-gradient-to-br from-teal-400 to-teal-100 text-black font-bold">
          <div className='flex flex-wrap m-5 '>
          <button className="btn bg-gradient-to-br from-violet-400 to-teal-200 text-black font-bold border-none " onClick={()=>{
            navigate(`/EditQuiz/${quiz.id}`)
          }}>Edit</button>
          <button className="btn bg-gradient-to-br from-violet-400 to-teal-200 text-black font-bold border-none ml-1" onClick={async ()=>{
            const quizRef = ref(db, `quizzes/${quiz.id}`);
            await remove(quizRef);
            setQuizzes(quizzes.filter(q=>q.id !== quiz.id ))
          }}>Delete</button>
          </div>
          <div className="card-body text-black ">
            <h2 className="card-title">
              {quiz.title}
              <div
                className={`badge ${selectBadgeColor(quiz.difficulty)}`}
                style={{ border: "none", padding: "3%", marginBottom: 4 }}
              >
                {quiz.difficulty}
              </div>
            </h2>
            <p>Created by: {quiz.createdBy}</p>
            <p>Category: {quiz.quizCategory}</p>
            <p>Duration: {quiz.maxDuration}</p>
            <p>End Date: {new Date(quiz.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuizzesList