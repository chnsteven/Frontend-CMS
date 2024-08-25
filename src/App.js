import "./App.css";
import "./utils/functions.js";
import React from "react";
import AppRouter from "./components/AppRouter";

// const PORT =
//   "localhost:5001" || "https://steven-chen-portfolio-server.onrender.com/";

function App() {
  return (
    <div className="body">
      <AppRouter />
    </div>
  );
}

export default App;
