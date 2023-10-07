import {
  useGetLabelsQuery,
  useUpdateTransactionMutation,
} from "../../store/apiSlice.js";

export default function RefundList() {
  const {
    data: labels,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetLabelsQuery();

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = labels.filter(
      (category) =>
        category.isRefundable === true &&
        category.userID === localStorage.getItem("userID")
    );
    // Generate transaction components for each filtered label object
    Transactions = filteredLabels.map((v, i) => (
      <Transaction key={i} category={v} refetch={refetch} />
    ));
  }
  if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="form max-w-sm mx-auto xl:w-96 lg:w-90">
      <h1 className="font-bold pb-4 text-xl">Refunds</h1>
      <div className=" font-bold items-center">{Transactions}</div>
    </div>
  );
}
function Transaction({ category, refetch }) {
  const [updateTransaction] = useUpdateTransactionMutation();

  // If category object is null or undefined, return null
  if (!category) return null;

  // Function to handle unchecking the transaction when the "X" button is clicked
  const handleUncheckTransaction = async () => {
    try {
      const updatedTransaction = {
        _id: category._id,
        isRefundable: !category.isRefundable,
      };

      const response = await updateTransaction(updatedTransaction);

      if (response.error) {
        console.error("Error updating transaction:", response.error);
        return;
      }
      refetch();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div
      className="item flex bg-gray-50 p-3 rounded-lg mb-3 justify-between"
      style={{ borderRight: `8px solid ${category.color ?? "red"}` }}
    >
      <div className="flex items-center w-full">
        {/* "X" button is hidden by default */}
        <button
          onClick={handleUncheckTransaction}
          className="px-1 py-1 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out opacity-0 transform translate-x-2 hover:opacity-100 hover:translate-x-0"
        >
          X
        </button>
        <span className="text-left flex-grow">{category.name ?? ""}</span>
        <span className="text-right p-2 mr-3 rounded-lg text-slate-400">
          ${category.amount}
        </span>
      </div>
    </div>
  );
}
