import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";

const Navbar = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-slate-800 py-4 px-20 flex justify-between">
        <div>
          {user && (
            <div className="flex items-center">
              <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full" />
              <p className="ml-2 text-cyan-300">{user.displayName}</p>
            </div>
          )}
        </div>
        <ul className="flex justify-between items-center text-slate-50">
          <li className="mx-5">
            <Link to="/" className="hover:text-cyan-400">
              Home
            </Link>
          </li>
          {!user && (
            <li className="mx-5">
              <Link to="/login" className="hover:text-cyan-400">
                Login
              </Link>
            </li>
          )}
          {user && (
            <li className="mx-5">
              <Link to="/dashboard" className="hover:text-cyan-400">
                Dashboard
              </Link>
            </li>
          )}
          {user && (
            <li className="mx-5">
              <button onClick={handleSignOut} className="hover:text-cyan-400">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
