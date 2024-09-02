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
    <div className="navbar text-primary">
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
            className="bg-base-100 menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" target="_blank">
                Homepage
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://www.linkedin.com/in/prateek46/">
                Linkedin
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://github.com/Prateek462003">
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <span className="btn btn-ghost text-2xl">TRAVELZZ</span>
        </Link>
      </div>
      <div className="navbar-end flex gap-2">
        {user.userId && (
          <Link to="/itineraries" className="btn rounded-md text-xl h-10 w-40">
            <FaHome />
            <span className="text-sm">My Itineraries</span>
          </Link>
        )}

        {user.username ? (
          <>
            <div className="dropdown dropdown-end btn p-0 avatar placeholder rounded-full">
              <div
                tabIndex={0}
                role="button"
                className=" text-xl font-semibold w-10 m-1"
              >
                {user.username[0].toUpperCase()}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box z-[1] "
              >
                <button
                  onClick={handleLogout}
                  className="btn  rounded-md text-lg h-10 w-36"
                >
                  <span className="text-sm">Logout</span>
                </button>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn  rounded-md text-xl h-10 w-40">
            <span className="text-sm">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
