import React from "react";
import "boxicons";
import {
  default as api,
  useDeleteTransactionMutation,
} from "../store/apiSlice";
import { useGetLabelsQuery } from "../store/apiSlice";
import { useGetCategoriesQuery } from "../store/apiSlice";

export default function List() {
  const {
    data: labels,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetLabelsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handlerClick = async (e) => {
    if (!e.target.dataset.id) return;
    await deleteTransaction({ _id: e.target.dataset.id });
    refetch();
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = labels.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick} />
    ));
  }

  if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl"> History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
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
