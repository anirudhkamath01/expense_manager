import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chartData, getTotal } from "../../helper/helper";
import { useGetLabelsQuery } from "../../store/apiSlice";

Chart.register(ArcElement);

export default function Graph({ monthIndex }) {
  // Fetching data using a custom hook
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  let graphData;
  let filteredData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    // Render the Doughnut chart with filtered data
    filteredData = data.filter(
      (item) => new Date(item.date).getMonth() === monthIndex
    );
    // Render the Doughnut chart with filtered data
    graphData = <Doughnut {...chartData(filteredData)} />;
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
        </div>
      </div>
    </div>
  );
}
