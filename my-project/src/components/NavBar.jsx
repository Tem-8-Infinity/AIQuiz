import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar bg-gray-700">
  <div className="flex-1">
    <a href='/' className="btn btn-ghost text-xl text-white">Team 8 Infinity</a>
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><Link to="/LogIn">Log In</Link></li>
        <li><Link to="/SignUp">Sign Up</Link></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar;