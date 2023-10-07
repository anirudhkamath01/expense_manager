import Graph from "./Graph.js";
import Forms from "./Forms.js";
import RefundList from "./RefundList.js";

import { useState } from "react";
import { useGetUserQuery } from "../../store/apiSlice.js";

export default function Main() {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const userID = localStorage.getItem("userID");
  const { data: userData, isLoading } = useGetUserQuery(userID);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="container mx-auto text-center text-gray-800">
        <nav className="flex justify-center py-8 mb-10 bg-slate-800 text-white rounded-lg">
          <div className="flex items-center">
            <span className="mx-auto text-4xl">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>{userData && userData.firstName}'s Expense Tracker</div>
              )}
            </span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

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
