import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const { register, handleSubmit, reset } = useForm();
  const [addTransaction] = useAddTransactionMutation();
  const { refetch: refetchLabels } = useGetLabelsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRefundable, setIsRefundable] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setSelectedCategory(categoriesData[0].type);
    }
  }, [categoriesData]);

  const onSubmit = async (data) => {
    if (!data) return;

    const transactionData = {
      ...data,
      category: selectedCategory,
      isRefundable: Boolean(isRefundable),
      date: startDate.toISOString(),
    };

    try {
      console.log("transactionData:", transactionData);
      await addTransaction(transactionData).unwrap();
      reset();
      refetchLabels();
    } catch (error) {
      console.error("Error creating transaction:", error);
      // Handle error
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleRefundableChange = () => {
    setIsRefundable(!isRefundable);
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transactions</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Salary, Rent, Etc."
              className="form-input"
            />
          </div>
          <select
            className="form-input"
            {...register("category")}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categoriesData &&
              categoriesData.map((category, index) => (
                <option key={index} value={category.type}>
                  {category.type}
                </option>
              ))}
          </select>

          <div className="input-group">
            <input
              type="text"
              placeholder="($) Amount"
              className="form-input"
              {...register("amount")}
              onChange={(e) => {
                const value = e.target.value.replace("$", "");
                e.target.value = value;
              }}
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isRefundable}
              onChange={handleRefundableChange}
              className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 font-medium text-black"
            >
              Refundable
            </label>
          </div>
          <div className="flex items-center mb-2">
            <label className="ml-2 font-medium text-black">Date: </label>
            <div className="ml-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-[#54C960] w-full">
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
