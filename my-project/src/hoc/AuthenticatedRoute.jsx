import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from "zustand";
import useUserStore from "../context/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../config/firebase-config';

const AuthenticatedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>
  } 
  if (!user) {
    return <Navigate to="/LogIn" />;
  }
  return children;
};

export default AuthenticatedRoute;
