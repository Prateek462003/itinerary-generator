import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://gen-it-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        dispatch(
          setCredentials({
            userId: data._id,
            username: data.username,
            token: data.token,
          })
        );
        navigate("/");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form onSubmit={handleSubmit} className="w-1/4 flex flex-col gap-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mt-5">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </div>
      </form>
      <span className="mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-500">
          Create an account
        </Link>
      </span>
    </div>
  );
};

export default Login;
