import { get, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";

export const searchUser = (searchTerm) => {
  return get(ref(db, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      throw new Error(`User with searchTerm ${searchTerm} does not exist!`);
    }
    const users = snapshot.val();
    const filteredUsers = Object
      .keys(users)
      .filter(
        (key) =>
          (users[key]?.username && users[key].username.includes(searchTerm)) ||
          (users[key]?.email && users[key].email.includes(searchTerm)) ||
          (users[key]?.firstName && users[key].firstName.includes(searchTerm)) ||
          (users[key]?.lastName && users[key].lastName.includes(searchTerm))
      )
      .map((key) => users[key]);
    return filteredUsers;
  });
};

export const blockUser = (uid, blockStatus) => {
  return update(ref(db, `users/${uid}`), {
    isBlocked: blockStatus,
  });
};