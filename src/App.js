import "./App.css";
import "./utils/functions.js";
import React from "react";
import AppRouter from "./components/AppRouter";
import { v4 as uuidv4 } from "uuid";

// const PORT =
//   "localhost:5001" || "https://steven-chen-portfolio-server.onrender.com/";

function App() {
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("uuid", uuid);
  }

  return (
    <div className="body">
      <AppRouter />
    </div>
  );
}

export default App;
