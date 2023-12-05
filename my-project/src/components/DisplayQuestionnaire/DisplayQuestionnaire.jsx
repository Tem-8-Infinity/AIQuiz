import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase-config";

const DisplayQuestionnaire = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);
  useEffect(() => {
    const dataRef = ref(db, "questionnaire");
    const queryRef = query(dataRef, orderByChild("quizId"), equalTo(quizId));
    get(queryRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let data = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
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

    <ul>
      <li className='card shadow-xl rounded-md m-5 hover:shadow-none transition-shadow duration-500'>
        <div className='flex flex-row gap-5 card-body font-bold text-lg'>
          <div>1.</div>
          Question one Question oneQuestion oneQuestion one ?
        </div>
      </li>
      <li className='card shadow-xl rounded-md m-5 hover:shadow-none transition-shadow duration-500'>
        <div className='flex flex-row gap-5 card-body font-bold text-lg'>
          <div>1.</div>
          Question one Question oneQuestion oneQuestion one ?
        </div>
      </li>
      <li className='card shadow-xl rounded-md m-5 hover:shadow-none transition-shadow duration-500'>
        <div className='flex flex-row gap-5 card-body font-bold text-lg'>
          <div>1.</div>
          Question one Question oneQuestion oneQuestion one ?
        </div>
      </li>
        
      
      {questionnaires.map((q,id)=>(<li key={id}>{q.question}</li>))}
    </ul>
    <button className="btn btn-primary ml-5" onClick={()=>{
      navigate(`/CreateQuestionnaire/${quizId}`)
    }}>Create Questionnaire</button>
    </>
  );
};

export default DisplayQuestionnaire;
