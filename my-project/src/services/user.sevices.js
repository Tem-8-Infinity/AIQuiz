import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
  update,
  onValue
} from "firebase/database";
import { db } from "../config/firebase-config";

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

export const createUser = async (username, email, phoneNumber, uid, role=1) => {
  const userObj = {
    username,
    email: email,
    phoneNumber,
    createdOn: Date.now(),
    uid,
    role 
  }
  await set(ref(db, 'users/' + uid), userObj)
};