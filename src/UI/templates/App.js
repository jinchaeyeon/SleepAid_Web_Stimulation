import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../organisms/Header/Header";
import Sidebar from "../organisms/Sidebar/Sidebar";
import ExperimentsPage from "../pages/ExperimentsPage/ExperimentsPage";
import UserPage from "../pages/UserPage/UserPage";
import LicensePage from "../pages/LicensePage/LicensePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FindIDPage from "../pages/FindIDPage/FindIDPage";
import ExperimentsSubPage from "../pages/ExperimentsSubPage/ExperimentsSubPage";
import ExperimentsMachinePage from "../pages/ExperimentsMachinePage/ExperimentsMachinePage";
import ExperimentsResultPage from "../pages/ExperimentsResultPage/ExperimentsResultPage";
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
              path="/SignUp"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <SignUpPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/FindID"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <FindIDPage />
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
              path="/ExperimentsSub/:id"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsSubPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsSub/:id/:subid"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsMachinePage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsResult/:id"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsResultPage />
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
