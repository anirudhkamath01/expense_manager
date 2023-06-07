import React from "react";
import { useGetLabelsQuery } from "../store/apiSlice";
import { getLabels } from "../helper/helper";

export default function Labels({ monthIndex }) {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = data.filter(
      (category) => new Date(category.date).getMonth() === monthIndex
    );
    // Generate label components for each label object
    Transactions = getLabels(filteredLabels, "type").map((v, i) => (
      <LabelComponent key={i} data={v} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return <>{Transactions}</>;
}

function LabelComponent({ data }) {
  if (!data) {
    return <></>;
  }
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        {/* Render the colored box */}
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        {/* Render the label type */}
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      {/* Render the percentage */}
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
