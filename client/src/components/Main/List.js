import React, { useState } from "react";
import "boxicons";
import {
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useGetCategoriesQuery,
} from "../../store/apiSlice";
import { useGetLabelsQuery } from "../../store/apiSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Transaction from "../Transaction";

export default function List({ monthIndex, handlePrevMonth, handleNextMonth }) {
  const {
    data: labels,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetLabelsQuery();

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const { data: categoriesData } = useGetCategoriesQuery();

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

  const handleDeleteTransaction = async (transactionId) => {
    await deleteTransaction({ _id: transactionId });
    refetch();
  };

  const handleEditTransaction = (transactionId) => {
    setEditingTransactionId(transactionId);
  };

  const handleSaveTransaction = async (transactionId) => {
    if (!newName || !newAmount || !newCategory) {
      alert("Name, amount, and category are required.");
      return;
    }

    try {
      const updatedTransaction = {
        _id: transactionId,
        name: newName,
        amount: newAmount,
        category: newCategory,
      };

      console.log("updatedTransaction:", updatedTransaction);

      const response = await updateTransaction(updatedTransaction);

      if (response.error) {
        console.error("Error updating transaction:", response.error);
        return;
      }

      refetch();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }

    setEditingTransactionId(null);
  };

  const handleCancelTransaction = () => {
    setEditingTransactionId(null);
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = labels.filter(
      (category) =>
        new Date(category.date).getMonth() === monthIndex &&
        category.userID === localStorage.getItem("userID")
    );
    Transactions = filteredLabels.map((v) => (
      <Transaction
        key={v._id}
        category={v}
        isEditing={
          editingTransactionId !== null &&
          v._id === editingTransactionId.toString()
        }
        handleDeleteTransaction={handleDeleteTransaction}
        handleEditTransaction={handleEditTransaction}
        handleSaveTransaction={handleSaveTransaction}
        handleCancelTransaction={handleCancelTransaction}
        setNewName={setNewName}
        setNewAmount={setNewAmount}
        setNewCategory={setNewCategory}
        categoriesData={categoriesData}
      />
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
