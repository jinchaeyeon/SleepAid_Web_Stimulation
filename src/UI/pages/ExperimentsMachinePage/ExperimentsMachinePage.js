import { Box } from "@mui/material";
import React from "react";
import ExperimentMachineListPageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageHeader";
import ExperimentMachinePageFooter from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageFooter";
import ExperimentMachinePageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageMiddle";
import ExperimentMachinePageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageHeader";
import ExperimentMachineListPageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageMiddle";
import Api from "../../../API/API";
import { useEffect } from "react";

function ExperimentsMachinePage() {
  const [state, setState] = React.useState(false);
  const [mornitoringState, setMornitoringState] = React.useState();
  const [machine, setMachine] = React.useState();
  const [starttime , setStarttime] = React.useState();
  const [data, setData] = React.useState([
    { t : 0, B3_5_EEG1: 0, B6_8_EEG2: 0, B9_11_PPG_avg: 0, B27_28_X: 0, B29_30_Y: 0, B31_32_Z: 0 }
  ]);

  const hightFunction = (
    t,
    B3_5_EEG1,
    B6_8_EEG2,
    B9_11_PPG_avg,
    B27_28_X,
    B29_30_Y,
    B31_32_Z,
    bluetoothService,
    starttime
  ) => {
    setState(true);
    setData([
      { t, B3_5_EEG1, B6_8_EEG2, B9_11_PPG_avg, B27_28_X, B29_30_Y, B31_32_Z },
    ]);
    setMachine(bluetoothService);
    setStarttime(starttime);
  };

  const hightFunction2 = (text) => {
    setMornitoringState(text);
  }

  useEffect (()=> {

  }, [])
  return (
    <>
      {state == false ? (
        <>
          <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
            <ExperimentMachinePageHeader />
            <ExperimentMachinePageMiddle propFunction={hightFunction} />
            <ExperimentMachinePageFooter />
          </Box>
        </>
      ) : (
        <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
          <ExperimentMachineListPageHeader />
          <ExperimentMachineListPageMiddle starttime={starttime} data={data} machine={machine} propFunction={hightFunction2}/>
          <ExperimentMachinePageFooter />
        </Box>
      )}
    </>
  );
}

export default ExperimentsMachinePage;
