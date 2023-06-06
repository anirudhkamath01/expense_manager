import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import {
  useAddTransactionMutation,
  useGetLabelsQuery,
} from "../store/apiSlice";

export default function Forms() {
  const { register, handleSubmit, reset } = useForm();
  const [addTransaction] = useAddTransactionMutation();

  const { data: labelsData, refetch: refetchLabels } = useGetLabelsQuery(); // Destructure refetchLabels

  const onSubmit = async (data) => {
    if (!data) return;
    await addTransaction(data).unwrap();
    reset();
    refetchLabels(); // Manually refetch the labels data
  };

  useEffect(() => {
    refetchLabels(); // Initial fetch of labels data
  }, [refetchLabels]);

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transactions</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Salary, House Rent"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="Amount"
              className="form-input"
              {...register("amount")}
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-[#64403E] w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}
