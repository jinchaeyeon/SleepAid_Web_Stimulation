import { Box, Button, Modal, Paper } from "@mui/material";
import React from "react";
import ExperimentsMachinePageModalHeader from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageModalHeader';
import ExperimentsMachinePageModalMiddle from '../../molecules/ExperimentsMachinePage/ExperimnetsMachinePageModalMiddle';
import cookie from "../../../API/cookie";

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
var defaultValue;

let user_id = cookie.getCookie("userAccount")
  ? cookie.getCookie("userAccount")
  : "";
var api_token = cookie.getCookie("accessToken");

if (user_id) {
  defaultValue = {
    key: api_token,
  };
}

function ExperimentMachineListPageMiddle(props) {
  const machine = props.machine;
  const [openTrue, setOpenTrue] = React.useState(false);
  const handleOpenTrue = () => {
    setOpenTrue(true);
  };
  const handleCloseTrue = () => setOpenTrue(false);

  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <Button
        style={{
          position: "absolute",
          color: "white",
          top: "50%",
          left: "48%",
          fontFamily: "GmarketSansMedium",
        }}
        size="large"
        variant="contained"
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
          <ExperimentsMachinePageModalMiddle machine={machine} propFunction={handleCloseTrue} />
        </Box>
      </Modal>
    </Paper>
  );
}

export default ExperimentMachineListPageMiddle;
