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
  const snapshot = await get(query(ref(db, '/quizzes'))); // Ensure correct path to quizzes
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

export const getQuizById = async (quizId) => {
  const snapshot = await get(query(ref(db, `/quizzes/${quizId}`)));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
}

export const getAllQuizzesNoFilter = async () => {
  const quizzesRef = ref(db, 'quizzes');
  try {
    const snapshot = await get(quizzesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No quizzes available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

export const createQuiz = async (createdBy, isPrivate, quizCategory, quizDifficulty, quizDuration, quizName) => {
  const quizRef = push(ref(db, '/quizzes'));
  await set((quizRef), {
    createdBy,
    isPrivate,
    quizCategory,
    quizDifficulty,
    quizDuration,
    quizName,
    questions: [],
    results: [],
  });
  console.log(quizRef.key);
  return await quizRef.key;
};

// Store the results of a quiz for a user
export const storeQuizResult = async (uid, quizId, score) => {
  const quizResultsRef = ref(db, `quizResults/${quizId}/${uid}`);
  await set(quizResultsRef, { score });
};

export const storeDataInResult = async (quizId, score) => {
  debugger;
  const resultsRef = ref(db, `quizzes/${quizId}/results`)
  const resultsSnapshot = await get(query(resultsRef));
  const results = resultsSnapshot.val();
  results.push(score)
  await set(resultsRef, results)
};

// Retrieve the top performers for a quiz
export const getTopPerformers = async (quizId) => {
  const quizResultsRef = ref(db, `quizResults/${quizId}`);
  const snapshot = await get(quizResultsRef);
  if (snapshot.exists()) {
    let results = [];
    snapshot.forEach((childSnapshot) => {
      let userId = childSnapshot.key;
      let score = childSnapshot.val().score;
      results.push({ userId, score });
    });
    // Sort and get the top 3 performers
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 3);
  }
  return [];
};