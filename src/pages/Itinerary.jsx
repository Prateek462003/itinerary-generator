import React from "react";
import { useSelector } from "react-redux";

const Itinerary = () => {
  const iten = useSelector((state) => state.iten.data);
  console.log(iten);
  var data = {};
  if (iten) {
    data = iten.itinerary;
  }
  const { title, budget, days } = data;

  return (
    <div>
      {!iten ? (
        <div className="flex flex-col items-center mt-40">
          <span className="loading loading-dots w-20"></span>
          <span className="text-xs">Please wait...</span>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="flex flex-col justify-center items-center mb-5 bg-primary rounded-md p-2 ">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-lg font-semibold">Budget: INR {budget}</p>
          </div>

          <div className="space-y-6">
            {days.map((day) => (
              <div key={day._id} className="card w-full shadow-xl">
                {/* dropdown */}
                <div className="collapse collapse-arrow bg-secondary text-primary">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title text-xl font-medium">
                    Day {day.day}: {day.date}
                  </div>
                  <div className="collapse-content">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="text-base leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: activity }} />
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
