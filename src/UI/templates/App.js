import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FindIDPage from "../pages/FindIDPage/FindIDPage";
import "./App.css";
import Box from "@mui/material/Box";
import cookie from "../../API/cookie";
import ExperimentsMachinePage from "../../UI/pages/ExperimentsMachinePage/ExperimentsMachinePage";
import Sidebar from "../organisms/Sidebar/Sidebar";

const App = () => {
  var user_id = cookie.getCookie("userAccount");
  setInterval(() =>  {
    if (cookie.getCookie("is_Login") == 0) {
      alert("중복 로그인입니다. 다시 로그인 해주세요.");
      cookie.deleteCookie();
      cookie.setCookie("is_Login", 1, 1);
      window.location.href = "/";
    }
  }, 1000);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user_id == "" ? (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Box style={{ width: "100%" }}>
                      <LoginPage />
                    </Box>
                  </Box>
                ) : (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Sidebar />
                    <Box style={{ width: "100%" }}>
                      <Header />
                      <ExperimentsMachinePage />
                    </Box>
                  </Box>
                )
              }
            />
            <Route
              path="/Login"
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
