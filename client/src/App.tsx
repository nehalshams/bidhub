import React from "react";
import "./App.css";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Router/>
      <ToastContainer/>
    </>
  );
}

export default App;
