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
import { toast } from "react-toastify";

export const getAllQuizzes = async () => {
  const snapshot = await get(query(ref(db, '/quizzes')));
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
    toast.error('Error fetching quizzes:', error);
    throw error;
  }
};

export const createQuiz = async (createdBy, quiz) => {
  const quizRef = push(ref(db, '/quizzesTest'));
  await set((quizRef), {
    createdBy,
    ...quiz,
    createdOn: Date.now(),
    questions: [],
    results: [],
  });
  console.log(quizRef.key);
  return await quizRef.key;
};

export const storeQuizResult = async (uid, quizId, score) => {
  const quizResultsRef = ref(db, `quizResults/${quizId}/${uid}`);
  await set(quizResultsRef, { score });
};

export const storeDataInResult = async (quizId, score) => {
  try {
    const resultsRef = ref(db, `quizzes/${quizId}/results`);
    const resultsSnapshot = await get(query(resultsRef));
    let results = resultsSnapshot.val();

    if (!results) {
      results = [];
    }

    results.push(score);
    await set(resultsRef, results);
  } catch (error) {
    toast.error('Error storing data in result:');
    throw error;
  }
};

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
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 3);
  }
  return [];
};