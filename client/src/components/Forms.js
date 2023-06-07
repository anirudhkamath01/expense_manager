import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import {
  useAddTransactionMutation,
  useGetCategoriesQuery,
  useGetLabelsQuery,
} from "../store/apiSlice";

export default function Forms({
  monthIndex,
  handlePrevMonth,
  handleNextMonth,
}) {
  const { register, handleSubmit, reset } = useForm(); // Initialize react-hook-form
  const [addTransaction] = useAddTransactionMutation(); // Destructure the addTransaction mutation from the generated hook

  const { data, refetch: refetchLabels } = useGetLabelsQuery(); // Destructure the data and refetchLabels from the useGetLabelsQuery hook

  const onSubmit = async (data) => {
    if (!data) return; // Check if form data exists
    await addTransaction(data).unwrap(); // Call the addTransaction mutation and unwrap the result
    reset(); // Reset the form fields
    refetchLabels(); // Manually refetch the labels data
  };
  const { categoriesData } = useGetCategoriesQuery();

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transactions</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")} // Register the "name" field with react-hook-form
              placeholder="Salary, House Rent"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Expense" defaultValue>
              Expense
            </option>
            <option value="Investment">Investment</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="($)Amount"
              className="form-input"
              {...register("amount")} // Register the "amount" field with react-hook-form
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-[#64403E] w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>
      <List
        monthIndex={monthIndex}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
    </div>
  );
}
