import { Box } from "@mui/material";
import React from "react";
import ExperimentMachineListPageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageHeader";
import ExperimentMachinePageFooter from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageFooter";
import ExperimentMachinePageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageMiddle";
import ExperimentMachinePageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageHeader";
import ExperimentMachineListPageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageMiddle";

function ExperimentsMachinePage() {
  const [state, setState] = React.useState(false);
  const hightFunction = (machine) => {
    if (machine != null) {
      setState(true);
    }
  };
  return (
    <>
      {state == false ? (
        <>
          <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem" }}>
            <ExperimentMachinePageHeader />
            <ExperimentMachinePageMiddle propFunction={hightFunction} />
            <ExperimentMachinePageFooter />
          </Box>
        </>
      ) : (
        <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem" }}>
        <ExperimentMachineListPageHeader />
        <ExperimentMachineListPageMiddle />
        <ExperimentMachinePageFooter />
      </Box>
      )}
    </>
  );
}

export default ExperimentsMachinePage;
