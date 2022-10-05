import { Box } from "@mui/material";
import React from "react";
import ExperimentMachineListPageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageHeader";
import ExperimentMachinePageFooter from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageFooter";
import ExperimentMachinePageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageMiddle";
import ExperimentMachinePageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageHeader";
import ExperimentMachineListPageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageMiddle";

function ExperimentsMachinePage() {
  const [state, setState] = React.useState(false);
  const [mornitoringState, setMornitoringState] = React.useState();
  const [machine, setMachine] = React.useState();

  const hightFunction = (
    bluetoothService
  ) => {
    setState(true);
    setMachine(bluetoothService);
  };

  const hightFunction2 = (text) => {
    setMornitoringState(text);
  }
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
          <ExperimentMachineListPageMiddle machine={machine} propFunction={hightFunction2}/>
          <ExperimentMachinePageFooter />
        </Box>
      )}
    </>
  );
}

export default ExperimentsMachinePage;
