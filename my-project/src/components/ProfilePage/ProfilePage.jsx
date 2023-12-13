import React, { useState, useEffect } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase-config";
import useUserStore from "../../context/store";
import { changeUserAvatar, updateUserData } from "../../services/user.services";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  ref as dbRef,
  equalTo,
  get,
  orderByChild,
  query,
} from "firebase/database";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatarUrl || "");
  const [newPassword, setNewPassword] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const quizRef = dbRef(db, "quizzesTest");

    const quizQuery = query(
      quizRef,
      orderByChild("createdBy"),
      equalTo(user.username)
    );
    get(quizQuery).then((snapshot) => {
      setQuizzes(Object.values(snapshot.val()));
    });
  }, [user]);
  const auth = getAuth();

  const handlePasswordChange = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      await signInWithEmailAndPassword(auth, user.email, newPassword);
      toast.success("Password updated successfully.");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(`Password not changed: ${error.message}`);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    try {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      const result = await uploadBytes(avatarRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      await changeUserAvatar(avatarUrl, user.uid);
      setAvatar(avatarUrl);
    } catch (error) {
      toast.error(`Avatar not changed`);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const updatedUserData = {
        ...user,
        firstName,
        lastName,
        email,
      };
      await updateUserData(user.uid, updatedUserData);
      useUserStore.setState({ user: updatedUserData });
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(`Profile could not be updated`);
    }
  };

  return (
    <div className="p-6  md:m-5 text-black bg-border shadow-md rounded bg-gradient-to-br from-amber-200 to-teal-300">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="mb-4">
        <label className="block mb-2 font-bold">First Name:</label>
        <input
          placeholder="New First Name..."
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input__dark p-2 border rounded  w-full mb-2 md:w-96 placeholder-orange-300 "
        />
        <label className="block mb-2 font-bold">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input__dark p-2 border rounded  w-full mb-2 md:w-96 placeholder-orange-300"
        />
        <label className="block mb-2 font-bold">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input__dark p-2 border rounded w-full mb-2 md:w-96"
        />
        <button
          onClick={handleProfileUpdate}
          className="bg-blue-500 text-white p-2 rounded font-bold"
        >
          Update Profile
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Avatar:</label>
        <input
          type="file"
          onChange={handleAvatarChange}
          className="input__dark p-2 border rounded font-bold"
        />
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full mt-2"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input__dark p-2 border rounded w-full mb-2 md:w-96"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white p-2 rounded font-bold"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
