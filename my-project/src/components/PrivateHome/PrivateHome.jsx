import React, { useState, useEffect } from 'react'
import { getAllQuizzes } from '../../services/quiz.services';

const PrivateHome = () => {
    const [quizzes, setQuizzes] = useState();
    useEffect(()=>{
        getAllQuizzes().then((data)=> setQuizzes(data) )
    },[])
    useEffect(()=>{
        console.log(quizzes);
    },[quizzes])
  return (
    <div>PrivateHome</div>
  )
}

export default PrivateHome