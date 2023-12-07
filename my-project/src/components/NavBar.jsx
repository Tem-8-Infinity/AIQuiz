import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../context/store";
import { logoutUser } from "../services/auth.services";
import defaultAvatar from "./../assets/defaultAvatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";

const NavBar = () => {
  const { user, setUser } = useUserStore();
  const [firebaseUser] = useAuthState(auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logoutUser();
      setUser(null);
      navigate("/"); // Navigate to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  console.log(user, firebaseUser);
  return (
    <div className="navbar bg-gray-700">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          AIQuiz
        </Link>
      </div>
      <div className="flex-none gap-2">
        {firebaseUser ? (
          <>
            <div className="flex gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"          
                  className="input input-bordered"
                />
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.avatarURL || defaultAvatar}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  {user?.admin && (
                    <li>
                      <Link to={"/AdminPanel"} className="justify-between">
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/Profile"} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={"/createQuiz"} className="justify-between">
                      Create Quiz
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/LogIn" className="btn btn-ghost text-white">
              Log In
            </Link>
            <Link to="/SignUp" className="btn btn-ghost text-white">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;