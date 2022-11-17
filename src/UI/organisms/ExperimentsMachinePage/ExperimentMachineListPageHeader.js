import { Box } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";

function ExperimentMachineListPageHeader(props) {

  return (
    <Box style={{ width: "100%", height: "10vh" }}>
      <CloudIcon
        style={{
          color: "#2877b9",
          marginRight: 8,
          marginLeft: 50,
          marginTop: 20,
        }}
      />
      <h2 style={{ color: "white", display: "inline", fontFamily: 'GmarketSansMedium' }}>자극 (Stimulation)</h2>
    </Box>
  );
}

export default ExperimentMachineListPageHeader;
