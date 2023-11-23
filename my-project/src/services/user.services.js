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

export const changeUserAvatar = async (img, uid) => {
  return update(ref(db), {
    [`/users/${uid}/avatarURL`]: img,
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
      avatarURL: ""
    };
    await set(ref(db, `users/${uid}`), userObj);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};


export const getUserData = async (uid) => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No user data available");
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (uid, userData) => {
  try {
    await set(ref(db, `users/${uid}`), userData);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Example of updating user data
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  // Render user data or related components
};

export default UserProfile;