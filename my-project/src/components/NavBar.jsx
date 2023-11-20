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
        <button className="btn btn-square btn-ghost text-white items-center " >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 m-auto stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li><Link to="/LogIn">Log In</Link></li>
        <li><Link to="/SignUp">Sign Up</Link></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar;