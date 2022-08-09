import { Box, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const publicUrl = process.env.PUBLIC_URL;
  const [ID, setID] = React.useState("");
  const [Name, setName] = React.useState("");
  const [PW, setPW] = React.useState("");
  const [PWCheck, setPWCheck] = React.useState("");
  const [License, setLicense] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const handleChangeID = (event) => {
    setID(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePW = (event) => {
    setPW(event.target.value);
  };
  const handleChangePWCheck = (event) => {
    setPWCheck(event.target.value);
  };
  const handleChangeLicense = (event) => {
    setLicense(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
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
          width: "60%",
          height: "100%",
          position: "absolute",
          left: "20%",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            position: "relative",
            top: "25%",
            margin: 0,
            padding: 0,
          }}
        >
          <img
            style={{ marginBottom: 30 }}
            alt="home icon"
            src={`${publicUrl}/logoLogin.png`}
          />
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth label="User Id" variant="outlined" onChange={handleChangeID} inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth label="Name" variant="outlined" onChange={handleChangeName} inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth label="Password" variant="outlined" onChange={handleChangePW} inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Password Check"
                    variant="outlined"
                    onChange={handleChangePWCheck}
                    inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth label="LicenseKey" variant="outlined" onChange={handleChangeLicense} inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField fullWidth label="E-mail" variant="outlined" onChange={handleChangeEmail} inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}/>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box style={{ float: "right" }}>
                    <Link to="/"  style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        style={{ marginRight: 5, backgroundColor: "#2877b9" ,fontFamily: 'GmarketSansMedium' }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link to="/"  style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#868e96",fontFamily: 'GmarketSansMedium'  }}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
