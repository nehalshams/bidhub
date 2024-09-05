import React from "react";
import "./App.css";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
function App() {
  return (
    <Box mx={'3rem'}>
      <Router/>
      <ToastContainer/>
    </Box>
  );
}

export default App;
