import { Box } from "@mui/material";
import React from "react";
import ExperimentMachinePageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageHeader";
import ExperimentMachinePageFooter from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageFooter";
import ExperimentMachinePageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageMiddle";

function ExperimentsPage() {
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
        "Gg"
      )}
    </>
  );
}

export default ExperimentsPage;
