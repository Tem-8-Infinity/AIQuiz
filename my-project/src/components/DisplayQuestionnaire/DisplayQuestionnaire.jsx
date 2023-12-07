import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase-config";

const DisplayQuestionnaire = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);
  useEffect(() => {
    const dataRef = ref(db, `quizzes/${quizId}`);
    get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let data = [];
        for (const [key, value] of Object.entries(snapshot.val().questions)) {
          data.push(value);
        }
        setQuestionnaires(data);
      }
    });
    console.log(questionnaires);
  }, []);
  return (
    <>
    <div>DisplayQuestionnaire</div>
    {questionnaires.length === 0 && (
      <div className=" m-5 p-3 text-center text-3xl font-bold saturate-200 tracking-wide ">
        Add your first question !
      </div>
    )}
    <ul>
      {questionnaires.map((q,id)=>(
        <li key={id} className='card shadow-xl rounded-md m-5 hover:shadow-none transition-shadow duration-500'>
          <div className='flex flex-row gap-5 card-body font-bold text-lg'>
          <div>{id+1}.</div>{/*Count mechanism */}
          <div>{q.question}</div>
          </div>
         </li>
         ))}
        
      
    </ul>
    <button className="btn btn-primary ml-5" onClick={()=>{
      navigate(`/CreateQuestionnaire/${quizId}`)
    }}>Create Questionnaire</button>
    </>
  );
};

export default DisplayQuestionnaire;
