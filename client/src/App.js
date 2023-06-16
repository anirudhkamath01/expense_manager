import "./App.css";
import Graph from "./components/Graph.js";
import Forms from "./components/Forms";
import { useState } from "react";
import RefundList from "./components/RefundList";

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
      <div className="container mx-auto text-center text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded-lg">
          Expense Tracker
        </h1>

        <div className="grid lg:grid-cols-3 gap-7">
          <Graph key={monthIndex} monthIndex={monthIndex} />
          <Forms
            monthIndex={monthIndex}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
          />
          <RefundList />
        </div>
      </div>
    </div>
  );
}
