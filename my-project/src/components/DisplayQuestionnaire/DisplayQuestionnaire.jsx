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
      {quizId}
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(`/CreateQuestionnaire/${quizId}`);
        }}
      >
        Create Questionnaire
      </button>
      <ul>
        {questionnaires.map((q, id) => (
          <li key={id}>{q.question}</li>
        ))}
      </ul>
    </>
  );
};

export default DisplayQuestionnaire;
