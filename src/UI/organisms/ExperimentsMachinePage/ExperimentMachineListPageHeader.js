import { Box, Button } from "@mui/material";
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import {Link} from 'react-router-dom';

function ExperimentMachineListPageHeader() {
  const Experimentsid = window.location.href.split('/');
  const [state, setState] = React.useState(true);

  const handleState = () => {
    setState(!state);
  };

  return (
    <Box style={{ width: "93%", height: "10vh" }}>
      <CloudIcon
        style={{
          color: "#2877b9",
          marginRight: 8,
          marginLeft: 50,
          marginTop: 20,
        }}
      />
      <h2 style={{ color: "white", display: "inline" }}>Mornitoring</h2>
      <Button
        variant="contained"
        style={{
          display: "inline",
          backgroundColor: "#5e646b",
          marginLeft: 50,
        }}
      >
        Trigger
      </Button>
      {state == true ? (
        <Button
          variant="contained"
          onClick={() => handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
          }}
        >
          start
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
          }}
        >
          pause
        </Button>
      )}
      <Link to={`../ExperimentsResult/${Experimentsid[4]}/${Experimentsid[5]}`}>
        <Button
          variant="contained"
          style={{
            float: "right",
            display: "inline",
            backgroundColor: "#2877b9",
            marginTop: 25,
          }}
        >
          실험 종료
        </Button>
      </Link>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          marginRight: 20,
        }}
      >
        자극 설정
      </Button>
    </Box>
  );
}

export default ExperimentMachineListPageHeader;
