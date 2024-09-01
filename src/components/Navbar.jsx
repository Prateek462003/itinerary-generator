import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 text-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <span className="btn btn-ghost text-xl">TRAVELZZ</span>
        </Link>
      </div>
      <div className="navbar-end flex gap-2">
        {user.userId && (
          <Link
            to="/itineraries"
            className="btn btn-secondary rounded-md text-xl h-10 w-40"
          >
            <FaHome />
            <span className="text-sm">My Itineraries</span>
          </Link>
        )}

        {user.username ? (
          <>
            <Link to="/profile">
              <div className="avatar placeholder">
                <div className="bg-secondary text-base-100 font-semibold w-10 rounded-full">
                  <span className="text-xl">
                    {user.username[0].toUpperCase()}
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-secondary rounded-md text-lg h-10 w-30"
            >
              <span className="text-sm">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-secondary rounded-md text-xl h-10 w-40"
          >
            <span className="text-sm">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
