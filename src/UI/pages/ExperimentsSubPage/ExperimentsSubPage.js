import { Box } from '@mui/material';
import React from 'react';
import ExperimentSubPageFooter from '../../organisms/ExperimentsSubPage/ExperimentSubPageFooter';
import ExperimentSubPageHeader from '../../organisms/ExperimentsSubPage/ExperimentSubPageHeader';
import ExperimentSubPageMiddle from '../../organisms/ExperimentsSubPage/ExperimentSubPageMiddle';

function ExperimentsSubPage() {
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  return (
    <Box style={{backgroundColor: "#191919", padding: '1.rem 2rem'}}>
        <ExperimentSubPageHeader id={id}/>
        <ExperimentSubPageMiddle id={id}/>
        <ExperimentSubPageFooter />
    </Box>
  );
}

export default ExperimentsSubPage;