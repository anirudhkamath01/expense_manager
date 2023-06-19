import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetLabelsQuery,
} from "../../store/apiSlice";
import { getLabels } from "../../helper/helper";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export default function Labels({ monthIndex }) {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categoriesData = [], refetch: refetchLabels } =
    useGetCategoriesQuery();
  const [addCategoryMutation] = useAddCategoryMutation();
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = {
    pink: "#FFB6C1",
    lavender: "#E6E6FA",
    blue: "#89CFF0",
    green: "#98FF98",
    lilac: "#C8A2C8",
    peach: "#FFDAB9",
    gray: "#C0C0C0",
    coral: "#FF7F50",
    turquoise: "#40E0D0",
    mauve: "#E0B0FF",
  };

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

    // Check if the category name is a blank string
    if (!categoryName || categoryName.trim() === "") {
      // Handle the error, display a message, or prevent label creation
      console.log("Category name cannot be blank");
      return;
    }

    // Check if a color is selected
    if (!selectedColor) {
      // Handle the error, display a message, or prevent label creation
      console.log("A color must be selected");
      return;
    }

    const categoryData = { type: categoryName, color: selectedColor };

    try {
      await addCategoryMutation(categoryData);
      refetchLabels();
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle error
    }

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
    Transactions = getLabels(filteredLabels, categoriesData).map((v, i) => (
      <LabelComponent
        key={i}
        data={v}
        deleteCategory={deleteCategory}
        refetchLabels={refetchLabels}
      />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <>
      {Transactions}
      {showForm ? (
        <div>
          <form onSubmit={handleAddLabel}>
            <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder="Category"
              className="form-input"
            />
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="form-input"
            >
              <option value="">Select color</option>
              {Object.keys(colors).map((colorKey) => (
                <option key={colorKey} value={colors[colorKey]}>
                  {colorKey}
                </option>
              ))}
            </select>

            <button onClick={handleToggleForm} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={handleToggleForm}
          className="border border-dashed p-2 hover:bg-gray-100"
        >
          <ControlPointIcon />
        </button>
      )}
    </>
  );
}

function LabelComponent({ data, deleteCategory, refetchLabels }) {
  const handleButtonClick = async (e) => {
    const id = e.currentTarget.dataset.id; // Use currentTarget instead of target
    console.log(id);
    if (!id) return;
    await deleteCategory({ type: id });
    refetchLabels();
  };

  if (!data) {
    return <></>;
  }
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <div className="flex">
        <h3 className="font-bold mr-4">${data.expenseTotal.toFixed(2) ?? 0}</h3>
        <button
          data-id={data.type}
          className="px-3"
          onClick={handleButtonClick}
        >
          <box-icon size="20px" color="grey" name="trash" />
        </button>
      </div>
    </div>
  );
}
