import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import Labels from "./Labels";
import { chartData, getTotal, barChart } from "../../helper/helper";
import { useGetLabelsQuery } from "../../store/apiSlice";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement
); // Register the necessary elements

export default function Graph({ monthIndex }) {
  // Fetching data using a custom hook
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();

  let graphData;
  let filteredData;
  let barData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    // Render the Doughnut chart with filtered data
    filteredData = data.filter(
      (item) =>
        new Date(item.date).getMonth() === monthIndex &&
        item.userID === localStorage.getItem("userID")
    );
    // Render the Doughnut chart with filtered data
    graphData = <Doughnut {...chartData(filteredData)} />;
    barData = barChart(data); // Get the bar chart data
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          {isSuccess && (
            <h3 className="mb-4 font-bold title">
              Total
              <span className="block text-3xl text-emerald-400">
                ${getTotal(filteredData) ?? 0}
              </span>
            </h3>
          )}
        </div>

        <div className="flex flex-col py-10 gap-4">
          {isSuccess && <Labels monthIndex={monthIndex} />}
          {isSuccess && <h1>Expense Summary</h1>}
          {barData && <Bar data={barData} />} {/* Render the Bar chart */}
        </div>
      </div>
    </div>
  );
}
