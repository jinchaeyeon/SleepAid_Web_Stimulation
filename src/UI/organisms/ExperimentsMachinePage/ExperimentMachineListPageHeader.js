import { Box, Button, Modal } from "@mui/material";
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import { Link } from "react-router-dom";
import ExperimentsMachinePageModalHeader from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageModalHeader';
import ExperimentsMachinePageModalMiddle from '../../molecules/ExperimentsMachinePage/ExperimnetsMachinePageModalMiddle';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 600,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ExperimentMachineListPageHeader() {
  const Experimentsid = window.location.href.split("/");
  const [state, setState] = React.useState(true);
  const [openTrue, setOpenTrue] = React.useState(false);

  const handleOpenTrue = () => {
    setOpenTrue(true);
  };
  const handleCloseTrue = () => setOpenTrue(false);
  const handleEmail = (text) => {
    alert("Email이 변경되었습니다.");
    handleCloseTrue();
  };
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
          fontFamily: "GmarketSansMedium",
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
            fontFamily: "GmarketSansMedium",
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
            fontFamily: "GmarketSansMedium",
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
            fontFamily: "GmarketSansMedium",
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
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleOpenTrue}
      >
        자극 설정
      </Button>
      <Modal
        open={openTrue}
        onClose={handleCloseTrue}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentsMachinePageModalHeader propFunction={handleCloseTrue} />
          <ExperimentsMachinePageModalMiddle propFunction={handleCloseTrue}/>
        </Box>
      </Modal>
    </Box>
  );
}

export default ExperimentMachineListPageHeader;
