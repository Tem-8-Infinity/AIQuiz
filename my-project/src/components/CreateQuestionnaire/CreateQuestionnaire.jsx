import { child, get, push, ref, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';


const CreateQuestionnaire = () => {
    const [questionnaire,setQuestionnaire]= useState({
      correctAnswer:"",//the first one is true, should randomize
      incorrectAnswers:['','',''],
    });
    const {quizId} = useParams();
    const navigate = useNavigate();
        return(
      <form className='flex flex-col p-5 gap-5 w-full' onSubmit={async(e)=>{
         e.preventDefault();
        const questionnaireRef = ref(db, `quizzes/${quizId}/questions`);
        const data = {
          ...questionnaire,
          quizId,
        }  
        await push(questionnaireRef,data)
        navigate(`/DisplayQuestionnaire/${quizId}`)
      }}>
        <input type="text" placeholder="Write a Question" value={questionnaire.question} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          question: e.target.value,
        })}} className="input input-bordered w-full " />
        <div className='flex flex-col gap-5 pl-5'>
        <input type="text" placeholder="Write The First Option" value={questionnaire.
          correctAnswer} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          correctAnswer: e.target.value,
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Write The Second Option" value={questionnaire.
          incorrectAnswers[0]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [e.target.value, questionnaire.incorrectAnswers[1],questionnaire.incorrectAnswers[2]],
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Write The Second Option" value={questionnaire.
          incorrectAnswers[1]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [questionnaire.incorrectAnswers[0],e.target.value,questionnaire.incorrectAnswers[2]],
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Write The Second Option" value={questionnaire.
          incorrectAnswers[2]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [questionnaire.incorrectAnswers[0],questionnaire.incorrectAnswers[1],e.target.value],
        })}} className="input input-bordered w-full " />
        
        </div>
        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
  )
}

export default CreateQuestionnaire;