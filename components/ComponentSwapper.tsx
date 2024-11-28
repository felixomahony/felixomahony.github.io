import React, { useState } from "react";
import LinearMNIST from "../components/LinearMNIST";
import Research from "../components/Research";

export default function ComponentSwapper() {
  const [currentView, setCurrentView] = useState("research");

  return (
    <div className="flex-1 p-4 pl-2">
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentView("linearMNIST")}
        >
          LinearMNIST
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentView("research")}
        >
          Research
        </button>
      </div>
      <div className="overflow-y-auto h-full transition-transform duration-500 ease-in-out">
        {currentView === "linearMNIST" ? <LinearMNIST /> : <Research />}
      </div>
    </div>
  );
}
