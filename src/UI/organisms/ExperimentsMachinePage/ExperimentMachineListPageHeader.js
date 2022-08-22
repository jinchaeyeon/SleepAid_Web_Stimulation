import { Box, Button, Modal } from "@mui/material";
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import { Link } from "react-router-dom";
import ExperimentsMachinePageModalHeader from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageModalHeader';
import ExperimentsMachinePageModalMiddle from '../../molecules/ExperimentsMachinePage/ExperimnetsMachinePageModalMiddle';
import ExperimentsMachinePageMarkerHeader from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageMarkerHeader';
import ExperimentsMachinePageMarkerMiddle from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageMarkerMiddle';
import Api from "../../../API/API";
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
var times;
var today = new Date();

const protocol_exp_id = window.location.href.split("/")[5];
function ExperimentMachineListPageHeader(props) {
  const time = props.data;
  const machine = props.machine;
  const Experimentsid = window.location.href.split("/");
  const [state, setState] = React.useState(true);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openMarker, setOpenMarker] = React.useState(false);
  const handleOpenTrue = () => {
    setOpenTrue(true);
  };
  const handleCloseTrue = () => setOpenTrue(false);
  const handleMarkerOpenTrue = () => {
    times = new Date();
    setOpenMarker(true);
  };
  const handleMarkerCloseTrue = () => setOpenMarker(false);
  const handleState = () => {
    setState(!state);
    props.propFunction(!state);
  };
  
  const addTriger= async() => {
    var id=protocol_exp_id;
  
  var t=time;
  var obj={
    proto_exp_id:id,
    "time":t
  };
  const getData = async () => {
    const infoData = await Api.getAPI_PostTrigger(obj,defaultValue);
    if(infoData.status == 200) {
      alert("트리거가 추가되었습니다.")
    }
  };
  getData();
    
  }

  return (
    <Box style={{ width: "93%", height: "10vh", marginBottom: 20 }}>
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
        onClick={addTriger}
      >
        Trigger
      </Button>
      {state == true ? (
        <Button
          variant="contained"
          onClick={handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
            fontFamily: "GmarketSansMedium",
          }}
        >
          pause
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
            fontFamily: "GmarketSansMedium",
          }}
        >
          start
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
        onClick={handleMarkerOpenTrue}
      >
        Marker
      </Button>
      <Modal
        open={openMarker}
        onClose={handleMarkerCloseTrue}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentsMachinePageMarkerHeader propFunction={handleMarkerCloseTrue} />
          <ExperimentsMachinePageMarkerMiddle regtime={today} t={time} data={times} propFunction={handleMarkerCloseTrue}/>
        </Box>
      </Modal>
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
          <ExperimentsMachinePageModalMiddle machine={machine} data={time} propFunction={handleCloseTrue}/>
        </Box>
      </Modal>
    </Box>
  );
}

export default ExperimentMachineListPageHeader;
