import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from "../context/store";
import { logoutUser } from "../services/auth.services";
import defaultAvatar from "./../assets/defaultAvatar.svg";

const NavBar = () => {
  const { user, setUser} = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logoutUser();
      setUser(null);
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar bg-gray-700">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">Team 8 Infinity</Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <>
            {/* Display user's avatar if available */}
            
              <img src={user.avatarURL || defaultAvatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2.5" />
            
            

            <Link to="/Profile" className="btn btn-ghost text-white">My Profile</Link>
            <Link to="/" onClick={handleLogout} className="btn btn-ghost text-white">Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/LogIn" className="btn btn-ghost text-white">Log In</Link>
            <Link to="/SignUp" className="btn btn-ghost text-white">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
