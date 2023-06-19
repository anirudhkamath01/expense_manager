import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {user && <Route path="/" element={<Main />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
