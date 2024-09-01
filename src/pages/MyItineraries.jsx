import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIten } from "../redux/slices/itenerarySlice";
import Navbar from "../components/Navbar";

const MyItineraries = () => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);

  const handleClick = (iten) => {
    dispatch(setIten({ itinerary: iten }));
    navigate("/itinerary");
  };

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(
          `https://gen-it-backend.onrender.com/api/itenerary/getItinerariesByUser?userId=${userId}`
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Fetched itineraries:", data);
          setItineraries(data.itineraries);
        } else {
          console.error("Failed to fetch itineraries:", data);
        }
      } catch (error) {
        console.error("Error during itinerary fetch:", error);
      }
    };

    fetchFunction();
  }, []);

  return (
    <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {itineraries.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40">
          <span className="loading loading-dots w-20"></span>
          <span className="text-xs">Please wait...</span>
        </div>
      ) : (
        itineraries.map((itinerary) => (
          <div
            key={itinerary._id}
            className="card bg-base-100 shadow-xl p-4 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card bg-primary text-primary-content w-96">
              <div className="card-body">
                <h2 className="card-title">{itinerary.title}</h2>
                <p>Budget: INR {itinerary.budget}</p>
                <ul className="list-disc list-inside mt-2">
                  {itinerary.days.map((day) => (
                    <li key={day._id} className="mt-2">
                      <span className="font-semibold">{day.date}</span>:{" "}
                      {day.activities.length > 0
                        ? day.activities[0]
                        : "No activities listed"}
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-secondary rounded-md"
                    onClick={() => handleClick(itinerary)}
                  >
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyItineraries;
