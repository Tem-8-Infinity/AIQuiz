import { child, get, push, ref, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';


const CreateQuestionnaire = () => {
    const [questionnaire,setQuestionnaire]= useState({});
    const {quizId} = useParams();
    const navigate = useNavigate();
        return(
      <form className='flex flex-col p-5 gap-5 w-full' onSubmit={async(e)=>{
         e.preventDefault();
        const questionnaireRef = ref(db, 'questionnaire');
        const data = {
          ...questionnaire,
          quizId,
        }  
        await push(questionnaireRef,data)
        navigate(`/DisplayQuestionnaire/${quizId}`)
      }}>
        <input type="text" placeholder="Question" value={questionnaire.question} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          question: e.target.value,
        })}} className="input input-bordered w-full " />
        <div className='flex flex-col gap-5 pl-5'>
        <input type="text" placeholder="Question" value={questionnaire.optionOne} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          optionOne: e.target.value,
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Question" value={questionnaire.optionTwo} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          optionTwo: e.target.value,
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Question" value={questionnaire.optionThree} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          optionThree: e.target.value,
        })}} className="input input-bordered w-full " />
        <input type="text" placeholder="Question" value={questionnaire.optionFour} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          optionFour: e.target.value,
        })}} className="input input-bordered w-full " />
        </div>
        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
  )
}

export default CreateQuestionnaire;