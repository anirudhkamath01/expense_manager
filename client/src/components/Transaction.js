import React from "react";

export default function Transaction({
  category,
  isEditing,
  handleDeleteTransaction,
  handleSaveTransaction,
  handleEditTransaction,
  handleCancelTransaction,
  setNewName,
  setNewAmount,
  setNewCategory,
  categoriesData,
}) {
  // If category object is null or undefined, return null
  if (!category) return null;

  const handleCancel = () => {
    handleCancelTransaction();
    console.log("cancel");
  };

  const handleSave = () => {
    // Perform save operation or update the data
    handleSaveTransaction(category._id);
  };

  const handleClick = () => {
    if (!isEditing) {
      handleEditTransaction(category._id);
    }
  };

  return (
    <div>
      <div
        className="item flex bg-gray-50 py-2 rounded-r justify-between hover:bg-gray-100 cursor-pointer"
        onClick={handleClick}
        style={{ borderRight: `8px solid ${category.color ?? "red"}` }}
      >
        <button
          className="px-3"
          onClick={() => handleDeleteTransaction(category._id)}
        >
          <box-icon
            data-id={category._id ?? ""}
            size="15px"
            color={category.color ?? "red"}
            name="trash"
          />
        </button>
        <div className="flex items-center w-full">
          {isEditing ? (
            <input
              className="rounded-lg"
              type="text"
              placeholder={category.name ?? ""}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <span className="text-left flex-grow">{category.name ?? ""}</span>
          )}
          <span className="text-right p-2 mr-3 rounded-lg text-slate-400">
            {isEditing ? (
              <input
                className="rounded-lg text-black"
                type="text"
                placeholder={category.amount ?? ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, "");
                  e.target.value = value;
                  setNewAmount(value);
                }}
              />
            ) : (
              `$${category.amount}`
            )}
          </span>
        </div>
      </div>
      {isEditing && (
        <div className="flex mt-3">
          <span>
            <select
              className="font-bold py-1 px-2 rounded mr-12"
              defaultValue={category.type}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.type}>
                  {cat.type}
                </option>
              ))}
            </select>
          </span>
          <button
            className="text-white font-bold py-1 px-2 rounded mr-2"
            style={{
              backgroundColor: category.color,
            }}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
