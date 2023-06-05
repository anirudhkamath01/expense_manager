import "./App.css";
import Graph from "./components/Graph.js";
import Forms from "./components/Forms";

export default function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
          Expense Tracker
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <Graph />
          <Forms />
        </div>
      </div>
    </div>
  );
}
