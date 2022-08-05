import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../organisms/Header/Header";
import Sidebar from "../organisms/Sidebar/Sidebar";
import ExperimentsPage from "../pages/ExperimentsPage/ExperimentsPage";
import UserPage from "../pages/UserPage/UserPage";
import LicensePage from '../pages/LicensePage/LicensePage';
import "./App.css";
import Box from '@mui/material/Box'

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Sidebar />
          <Box style={{width: "100%"}}>
            <Header />
            <Routes>
              <Route path="/Experiments" element={<ExperimentsPage />} />
              <Route path="/User" element={<UserPage />} />
              <Route path="/License" element={<LicensePage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
