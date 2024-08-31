import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://gen-it-backend.onrender.com/api/auth/register",
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
        console.log("Signup successful:", data);
        navigate("/login");
      } else {
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
      <form onSubmit={handleSubmit} className="w-1/4 flex flex-col gap-2  ">
        <div className="form-control">
          <label className="label">
            <span className="label-text">UserName</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="UserName"
            className="input input-bordered w-full"
          />
        </div>
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
            type="text"
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
            Signup
          </button>
        </div>
      </form>
      <span className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 ">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Signup;
