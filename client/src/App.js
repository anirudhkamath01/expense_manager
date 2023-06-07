import "./App.css";
import Graph from "./components/Graph.js";
import Forms from "./components/Forms";
import { useState } from "react";

export default function App() {
  const [monthIndex, setMonthIndex] = useState(5);

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded-lg">
          Expense Tracker
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <Graph key={monthIndex} monthIndex={monthIndex} />
          <Forms
            monthIndex={monthIndex}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
          />
        </div>
      </div>
    </div>
  );
}
