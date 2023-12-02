import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
  update,
  onValue,
  child,
  push
} from "firebase/database";
import { db } from "../config/firebase-config";

export const getAllQuizzes = async () => {
  const snapshot = await get(query(ref(db, '/quizes'))); // Ensure correct path to quizzes
  if (snapshot.exists()) {
    const keys = Object.keys(snapshot.val())
    return Object.values(snapshot.val()).map((quiz, index) => ({
      ...quiz,
      questions: Object.values(quiz.questions || {}),
      id: keys[index]
    }));
  } else {
    return [];
  }
};

export const createQuiz = async (createdBy,isPrivate,quizCategory,quizDifficulty, quizDuration, quizName ) => {
  const quizRef = push(ref(db, '/quizes'));
 await set((quizRef),{
    createdBy,
    isPrivate,
    quizCategory,
    quizDifficulty,
    quizDuration,
    quizName,
    questions:[]
  }); 
  console.log(quizRef.key);
  return await quizRef.key;
};