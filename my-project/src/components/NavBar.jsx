import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../context/store";
import { logoutUser } from "../services/auth.services";
import defaultAvatar from "./../assets/defaultAvatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";

const NavBar = () => {
  const { user, setUser } = useUserStore();
  const [firebaseUser] = useAuthState(auth);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
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

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
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
            <div className="flex gap-2 p">
              <div className="flex-none px-2">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    onChange={handleToggle}
                    checked={theme === "light" ? false : true}
                    value="synthwave"
                  />
                  <svg
                    className="swap-on fill-current w-15 h-15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: "yellow" }}
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                  <svg
                    className="swap-off fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: "lightskyblue" }}
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
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
