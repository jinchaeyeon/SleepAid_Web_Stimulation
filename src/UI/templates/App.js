import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../organisms/Header/Header";
import Sidebar from "../organisms/Sidebar/Sidebar";
import ExperimentsPage from "../pages/ExperimentsPage/ExperimentsPage";
import UserPage from "../pages/UserPage/UserPage";
import LicensePage from "../pages/LicensePage/LicensePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import "./App.css";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <LoginPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/Experiments"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/User"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <UserPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/License"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <LicensePage />
                  </Box>
                </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
