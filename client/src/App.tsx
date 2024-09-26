import React from "react";
import "./App.css";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Box, useTheme } from "@mui/material";
function App() {
  const theme = useTheme();
  return (
    <Box sx={{ height: '100vh', overflow: 'scroll',backgroundColor: theme.palette.primary['light']}} >
      <Router/>
      <ToastContainer/>
    </Box>
  );
}

export default App;
