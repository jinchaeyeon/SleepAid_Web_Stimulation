import { Box } from "@mui/material";
import React from "react";
import ExperimentResultPageHeader from '../../organisms/ExperimentsResultPage/ExperimentResultPageHeader';
import ExperimentResultPageFooter from "../../organisms/ExperimentsResultPage/ExperimentResultPageFooter";
function ExperimentsResultPage() {
  const id = window.location.href.split('/');
  return (
    <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem" }}>
            <ExperimentResultPageHeader id = {id[4]}/>
            {/* <ExperimentMachinePageMiddle propFunction={hightFunction} /> */}
            <ExperimentResultPageFooter />
    </Box>
  );
}

export default ExperimentsResultPage;
