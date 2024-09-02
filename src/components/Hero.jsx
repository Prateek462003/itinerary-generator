import React, { useState } from "react";
import MyForm from "./Form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoPaperPlane } from "react-icons/io5";

export default function Hero() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      document.getElementById("my_modal_1").showModal();
    }, 700);
  };

  const handleModalClose = () => {
    document.getElementById("my_modal_1").close();
    setTimeout(() => {
      setIsFadingOut(false);
      setIsButtonVisible(true);
    }, 300);
  };

  return (
    <div
      className="hero h-[91vh]"
      style={{
        backgroundImage: "url(/travelimage.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl text-primary font-bold">
            Plan Your Perfect Trip
          </h1>
          <p className="mb-5 text-secondary-content">
            Create a personalized itinerary in minutes. Just tell us your
            preferences, and we'll handle the rest.Click the button below to get
            Started!
          </p>
          <div className="flex align-center justify-center">
            {isButtonVisible && (
              <button
                onClick={() => {
                  if (userId == null) {
                    navigate("/signup");
                  }
                  handleFadeOut();
                  setTimeout(() => setIsButtonVisible(false), 700);
                }}
                className={`flex items-center justify-center w-32 gap-2 h-10 pt-1 transform transition-all duration-700 bg-base-100 text-primary rounded ${
                  isFadingOut ? "opacity-0 translate-x-full" : ""
                }`}
              >
                {/* <img
                  className="rotate-12 w-12"
                  src="1.png"
                  alt="Rotating Image"
                /> */}
                <IoPaperPlane />

                <span className="mb-1">Start here</span>
              </button>
            )}
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-full">
              <MyForm />
              <div className="modal-action justify-center w-full">
                <button className="btn" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
