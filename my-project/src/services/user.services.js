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
  child
} from "firebase/database";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";

/**
 * Get a Firebase database reference to a user based on their username.
 *
 * @param {string} username - The username of the user to get a reference for.
 * @returns {Firebase.database.Reference} A reference to the user in the Firebase Realtime Database.
 */
const getUserRef = (username) => ref(db, `users/${username}`);

/**
 * Retrieve user data from the Firebase Realtime Database based on the user's handle.
 *
 * @param {string} handle - The handle of the user to retrieve data for.
 * @returns {Promise<Firebase.database.DataSnapshot | null>} A promise that resolves to the data snapshot of the user in the Firebase Realtime Database, or `null` if an error occurs.
 */
export const getUserByHandle = async (handle) => {
  try {
    const data = await get(ref(db, `users/${handle}`));
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};


export const isUserBlocked = async (email) => {
  const users = (await get(ref(db, `users`))).val();
  return Object.values(users).some(u => u.email === email && u.isBlocked);
}

export const getUserNameByUserId = async (userId) => {
  try {
    const data = await get(ref(db, `users/${userId}/username`));
    return data.val();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export const changeUserAvatar = async (img, uid) => {
  return update(ref(db), {
    [`/users/${uid}/avatarURL`]: img,
  });
};

//for future role update from the Admin Panel
export const changeRole = async (uid, role) => {
  return update(ref(db), {
    [`/users/${uid}/role`]: role
  });
};

export const createUser = async (firstName, lastName, username, email, phoneNumber, uid, role) => {
  try {
    const userObj = {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      role,
      uid,
      avatarURL: "",
      isBlocked: false
    };
    await set(ref(db, `users/${uid}`), userObj);
  } catch (error) {
    toast.error('Error creating user:');
  }
};


export const getUserData = async (uid) => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    toast.error('Error fetching user data:');
    throw error;
  }
};

export const updateUserData = async (uid, userData) => {
  try {
    await set(ref(db, `users/${uid}`), userData);
  } catch (error) {
    toast.error('Error updating user data:');
  }
};

export const addCompletedQuiz = async (uid, quizId) => {
  const completedQuizzesRef = ref(db, `completedQuizzes/${uid}`);
  const completedQuizzesSnapshot = await get(completedQuizzesRef);
  const completedQuizzes = completedQuizzesSnapshot.exists() ? completedQuizzesSnapshot.val() : [];

  if (!completedQuizzes.includes(quizId)) {
    completedQuizzes.push(quizId);
    await set(completedQuizzesRef, completedQuizzes);
  }
};

export const getCompletedQuizzes = async (uid) => {
  const completedQuizzesRef = ref(db, `completedQuizzes/${uid}`);
  const snapshot = await get(completedQuizzesRef);
  return snapshot.exists() ? snapshot.val() : [];
};