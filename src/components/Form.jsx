import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIten } from "../redux/slices/itenerarySlice";

const MyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    budget: "",
    startDate: "",
    returnDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, userId: userId };
      navigate("/itinerary");
      const response = await fetch(
        "https://gen-it-backend.onrender.com/api/itenerary/generateItenerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // console.log(data);
        dispatch(setIten(data));
      } else {
        console.error("Failed to generate itinerary:", data);
      }
    } catch (error) {
      console.error("Error during itinerary generation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Source</span>
        </label>
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Enter your Source"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Destination</span>
        </label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Enter your Destination"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Budget</span>
        </label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter your budget"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Start Date</span>
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Return Date</span>
        </label>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="btn btn-primary w-full"
        >
          Generate Itenerary
        </button>
      </div>
    </form>
  );
};

export default MyForm;
