import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../organisms/Header/Header";
import Sidebar from "../organisms/Sidebar/Sidebar";
import MainPage from "../pages/MainPage/MainPage";
import UserPage from "../pages/UserPage/UserPage";
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
              <Route path="/" element={<MainPage />} />
              <Route path="/User" element={<UserPage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
