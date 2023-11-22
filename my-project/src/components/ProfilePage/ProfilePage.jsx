import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase-config';

//import useUserStore from '../context/store'; // Update path to your Zustand store

const ProfilePage = () => {
  //const { user, setUser } = useUserStore(); // Assuming you have user data in Zustand store
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Fetch user data if needed
  }, []);

  const handlePasswordChange = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert('Password updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const avatarRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(avatarRef, file);
    const avatarUrl = await getDownloadURL(avatarRef);
    setAvatar(avatarUrl);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {/* Display User Information */}
      <div className="mb-4">
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phoneNumber}</p>
      </div>
      {/* Avatar Upload */}
      <div className="mb-4">
        <label className="block mb-2">Avatar:</label>
        <input type="file" onChange={handleAvatarChange} className="p-2 border rounded" />
        {avatar && <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full mt-2" />}
      </div>
      {/* Password Change */}
      <div className="mb-4">
        <label className="block mb-2">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button onClick={handlePasswordChange} className="bg-blue-500 text-white p-2 rounded">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;