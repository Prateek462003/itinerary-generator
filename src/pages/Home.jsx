import React, { useEffect } from "react";
import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import { themeChange } from "theme-change";

const Home = () => {
  useEffect(() => {
    themeChange(false);
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
