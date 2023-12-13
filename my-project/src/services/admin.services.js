import { get, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";

export const searchUser = (searchTerm, startIndex = 0, usersPerPage = 10) => {
  return get(ref(db, "users"))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error("No users found.");
      }

      const users = snapshot.val();
      let filteredUsers = Object.keys(users)
        .map((key) => users[key])
        .filter(user =>
          user.username.includes(searchTerm) ||
          user.email.includes(searchTerm) ||
          user.firstName.includes(searchTerm) ||
          user.lastName.includes(searchTerm)
        );

      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
      return paginatedUsers;
    });
};

export const updateUserRole = (uid, newRole) => {
  return update(ref(db, `users/${uid}`), {
    role: newRole,
  });
};

export const blockUser = (uid, blockStatus) => {
  return update(ref(db, `users/${uid}`), {
    isBlocked: blockStatus,
  });
};