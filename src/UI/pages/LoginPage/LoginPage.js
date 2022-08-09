import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const publicUrl = process.env.PUBLIC_URL;
  const [ID, setID] = React.useState("");
  const [PW, setPW] = React.useState("");
  const handleChangeID = (event) => {
    setID(event.target.value);
  };
  const handleChangePW = (event) => {
    setPW(event.target.value);
  };
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
      <Box
        style={{
          width: 381,
          height: "100%",
          position: "absolute",
          left: "35%",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            position: "relative",
            top: "25%",
            width: 381,
            height: 320,
            margin: 0,
            padding: 0,
          }}
        >
          <img
            style={{ marginBottom: 30 }}
            alt="home icon"
            src={`${publicUrl}/logoLogin.png`}
          />
          <TextField
            fullWidth
            value={ID}
            onChange={handleChangeID}
            style={{ marginBottom: 10 }}
            inputProps={{style: { fontFamily: 'GmarketSansMedium'}}}
            placeholder="user ID"
          />
          <TextField
            fullWidth
            value={PW}
            onChange={handleChangePW}
            placeholder="Password"
            inputProps={{style: { fontFamily: 'GmarketSansMedium'}}}
          />
          <Link to="/Experiments" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "#3c486c",
                marginTop: 20,
                fontFamily: 'GmarketSansMedium'
              }}
            >
              Log in
            </Button>
          </Link>
          <Link to="/SignUp" style={{ textDecoration: "none" }}>
            <Button variant="text" style={{ float: "right",fontFamily: 'GmarketSansMedium' }}>
              Sign Up
            </Button>
          </Link>
          <Link to="/FindID" style={{ textDecoration: "none" }}>
            <Button variant="text" style={{ float: "right",fontFamily: 'GmarketSansMedium' }}>
              Find ID
            </Button>
          </Link>
        </Box>
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
    </Box>
  );
}

export default LoginPage;
