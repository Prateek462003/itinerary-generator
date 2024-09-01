import React, { useEffect } from "react";
import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import { themeChange } from "theme-change";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id, username } = decodedToken;
        dispatch(
          setCredentials({
            username: username,
            userId: id,
            token: token,
          })
        );
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  return (
    <div>
      <div className="max-h-screen">
        <Navbar />
        <div className="">
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default Home;
