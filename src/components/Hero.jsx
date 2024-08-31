import React, { useState } from "react";
import MyForm from "./Form";

export default function Hero() {
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
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Plan Your Perfect Trip</h1>
          <p className="mb-5">
            Create a personalized itinerary in minutes. Just tell us your
            preferences, and we'll handle the rest.<br></br> Click the button
            below to get Started!
          </p>
          <div className="flex align-center justify-center">
            {isButtonVisible && (
              <button
                onClick={() => {
                  handleFadeOut();
                  setTimeout(() => setIsButtonVisible(false), 700);
                }}
                className={`flex items-center justify-center w-36 h-10 pt-1 transform transition-all duration-700 bg-white rounded ${
                  isFadingOut ? "opacity-0 translate-x-full" : ""
                }`}
              >
                <img
                  className="rotate-12 w-12"
                  src="1.png"
                  alt="Rotating Image"
                />
                <span className="text-black mb-1">Start here</span>
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
