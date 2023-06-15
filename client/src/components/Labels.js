import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetLabelsQuery,
} from "../store/apiSlice";
import { getLabels } from "../helper/helper";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function Labels({ monthIndex }) {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  const { data: categoriesData = [], refetch: refetchLabels } =
    useGetCategoriesQuery();
  const [addCategoryMutation] = useAddCategoryMutation();
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    "red",
    "pink",
    "blue",
    "orange",
    "green",
    "purple",
    "yellow",
    "gray",
  ];

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setCategoryName("");
    setSelectedColor("");
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddLabel = async (e) => {
    e.preventDefault();

    const categoryData = { type: categoryName, color: selectedColor };

    try {
      await addCategoryMutation(categoryData);
      refetchLabels();

      // Manually refetch the labels data to update the labels component
      // The useGetLabelsQuery hook will automatically handle the refetch
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle error
    }

    // Reset form inputs and hide the form
    setCategoryName("");
    setSelectedColor("");
    setShowForm(false);
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = data.filter(
      (category) => new Date(category.date).getMonth() === monthIndex
    );
    // Generate label components for each label object
    Transactions = getLabels(filteredLabels, categoriesData).map((v, i) => (
      <LabelComponent key={i} data={v} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <>
      {Transactions}
      {showForm ? (
        <form onSubmit={handleAddLabel}>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
            placeholder="Category name"
          />
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="">Select color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
          <button onClick={handleToggleForm}>Cancel</button>
        </form>
      ) : (
        <button
          onClick={handleToggleForm}
          className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 hover:shadow-none"
        >
          <ControlPointIcon />
        </button>
      )}
    </>
  );
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
