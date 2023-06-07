import React, { useState } from "react";
import "boxicons";
import { useDeleteTransactionMutation } from "../store/apiSlice";
import { useGetLabelsQuery } from "../store/apiSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function List({ monthIndex, handlePrevMonth, handleNextMonth }) {
  // Fetch labels data and manage loading and error states
  const {
    data: labels,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetLabelsQuery();

  const [deleteTransaction] = useDeleteTransactionMutation();

  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Handle click event to delete a transaction and refetch labels data
  const handlerClick = async (e) => {
    if (!e.target.dataset.id) return;
    await deleteTransaction({ _id: e.target.dataset.id });
    refetch();
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = labels.filter(
      (category) => new Date(category.date).getMonth() === monthIndex
    );

    // Generate transaction components for each filtered label object
    Transactions = filteredLabels.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick} />
    ));
  }

  if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <div className="flex font-bold items-center justify-between">
        <ChevronLeftIcon
          fontSize="large"
          onClick={handlePrevMonth}
          className="cursor-pointer"
        />

        <h1 className="py-4 font-bold text-xl">
          {month[monthIndex] + " 2023"}
        </h1>
        <ChevronRightIcon
          fontSize="large"
          onClick={handleNextMonth}
          className="cursor-pointer"
        />
      </div>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  // If category object is null or undefined, return null
  if (!category) return null;

  return (
    <div
      className="item flex bg-gray-50 py-2 rounded-r justify-between"
      style={{ borderRight: `8px solid ${category.color ?? "red"}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          data-id={category._id ?? ""}
          size="15px"
          color={category.color ?? "red"}
          name="trash"
        />
      </button>
      <div className="flex items-center w-full">
        <span className="text-left flex-grow">{category.name ?? ""}</span>
        <span className="text-right p-2 mr-3 rounded-lg text-slate-400">
          ${category.amount}
        </span>
      </div>
    </div>
  );
}
