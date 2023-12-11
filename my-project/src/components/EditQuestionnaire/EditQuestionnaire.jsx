import { child, get, push, ref, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';


const EditQuestionnaire = () => {
    const [questionnaire,setQuestionnaire]= useState({
      correctAnswer:"",//the first one is true, should randomize
      incorrectAnswers:['','',''],
      maxDuration:0,
      points:0,
    });
    const {quizId, questionId} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
       const questionRef = ref(db, `quizzes/${quizId}/questions/${questionId}`)
       get(questionRef).then(snapshot=>{
        setQuestionnaire(snapshot.val())
       })
    },[]);

    const handleInputChange = (evt) => {
      setQuestionnaire((prevDetails) => ({
        ...prevDetails,
        //evt.target.name = category
        [evt.target.name]: evt.target.value,
      }));
    };
        return(
      <form className='flex flex-col p-5 gap-5 w-full' onSubmit={async(e)=>{
         e.preventDefault();
        const questionnaireRef = ref(db, `quizzes/${quizId}/questions/${questionId}`);
        const data = {
          ...questionnaire,
          points:+questionnaire.points,
          quizId,
        }  
        await update(questionnaireRef,data)
        update(ref(db),{
          [`quizzes/${quizId}/id`]:quizId
        })
        navigate(`/DisplayQuestionnaire/${quizId}`)
      }}>
        <div className='flex '>
        <input required minLength={5} type="text" placeholder="Write a Question" value={questionnaire.question} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          question: e.target.value,
        })}} className="input input-bordered w-full " />
         <div className='flex w-1/12'>
            <input
              required
              value={questionnaire.points}
              onChange={handleInputChange}
              name="points"
              type="number"
              min={0}
              max={300}
              placeholder="Points"
              className="input input-bordered w-11/12 ml-3 h-13"
            />
          </div>
        </div>
        <div className='flex flex-col gap-5 pl-5 '>
        <input required type="text" placeholder="Write The Correct Answer"  value={questionnaire.
          correctAnswer} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          correctAnswer: e.target.value,
        })}} className="input input-bordered w-full placeholder-green-400" />
        <input required type="text" placeholder="Write The Wrong Answer" value={questionnaire.
          incorrectAnswers[0]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [e.target.value, questionnaire.incorrectAnswers[1],questionnaire.incorrectAnswers[2]],
        })}} className="input input-bordered w-full placeholder-red-500" />
        <input required type="text" placeholder="Write The Wrong Answer" value={questionnaire.
          incorrectAnswers[1]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [questionnaire.incorrectAnswers[0],e.target.value,questionnaire.incorrectAnswers[2]],
        })}} className="input input-bordered w-full placeholder-red-500" />
        <input required type="text" placeholder="Write The Wrong Answer" value={questionnaire.
          incorrectAnswers[2]} onChange={(e)=>{setQuestionnaire({
          ...questionnaire,
          incorrectAnswers: [questionnaire.incorrectAnswers[0],questionnaire.incorrectAnswers[1],e.target.value],
        })}} className="input input-bordered w-full placeholder-red-500" />
        
        </div>
        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
  )
}

export default EditQuestionnaire;