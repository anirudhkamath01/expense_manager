import { useGetLabelsQuery } from "../store/apiSlice";

export default function RefundList() {
  const { data: labels, isFetching, isSuccess, isError } = useGetLabelsQuery();

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    const filteredLabels = labels.filter(
      (category) => category.isRefundable === true
    );
    // Generate transaction components for each filtered label object
    Transactions = filteredLabels.map((v, i) => (
      <Transaction key={i} category={v} />
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

function Transaction({ category }) {
  // If category object is null or undefined, return null
  if (!category) return null;

  return (
    <div
      className="item flex bg-gray-50 p-3 rounded-lg mb-3 justify-between"
      style={{ borderRight: `8px solid ${category.color ?? "red"}` }}
    >
      <div className="flex items-center w-full">
        <span className="text-left flex-grow">{category.name ?? ""}</span>
        <span className="text-right p-2 mr-3 rounded-lg text-slate-400">
          ${category.amount}
        </span>
      </div>
    </div>
  );
}
