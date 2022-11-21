import { Box } from "@mui/material";
import React from "react";

function errorPage() {
  return (
    <Box
      style={{
        display: "block",
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0",
      }}
    >
        <h2>서버 오류입니다. neurotx@neurotx.org로 문의주세요.</h2>
        <Box
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 20,
            width: "100%",
            textAlign: "center",
          }}
        >
          <h6 style={{ marginBottom: 0, color: "#212529" }}>Version. 1.0.0</h6>
          <h5 style={{ marginTop: 0, color: "#A7A7A7" }}>
            Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
          </h5>
        </Box>
      </Box>
  );
}

export default errorPage;
