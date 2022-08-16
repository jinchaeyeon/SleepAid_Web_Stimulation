import React from "react";
import { FormControl, NativeSelect, Box } from "@mui/material";
import getRealTimeChart from "./realtime_chart";
import PlotEEG1 from "./PlotEEG1";
import PlotEEG2 from "./PlotEEG2";
import PlotPPG from "./PlotPPG";
import PlotX from "./PlotX";
import PlotY from "./PlotY";
import PlotZ from "./PlotZ";

const d3 = document.createElement("script");

d3.src = "https://d3js.org/d3.v4.min.js";
d3.async = true;
const lineArr = [];
var chart = [];

function ExperimentMachineListPageMiddle(props) {
  const datas = props.data;
  const state = props.state;
  const [limit, setLimit] = React.useState([10,0]);
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];

  const opts = {
    width: 1350,
    height: 200,
    pxAlign: false,
    scales: {
      x: {
        time: false,
      },
      y: {
        auto: true,
      },
    },
    axes: [
      {
        show: false,
      },
    ],
    series: [
      { label: "데이터 갯수"},
      {
        label: "값",
        stroke: "blue",
      },
    ],
  };

  function init() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
      lineArr[i] = [];
    }
  }

  {
    init();
  }

  function list(i) {
    if (datas[0] == undefined) {
      return 0;
    } else if (i == 0) {
      return (
        <PlotEEG1 options={opts} data={datas[0]["B3_5_EEG1"]} state={state} limit={limit}/>
      );
    } else if (i == 1) {
      return (
        <PlotEEG2 options={opts} data={datas[0]["B6_8_EEG2"]} state={state} limit={limit}/>
      );
    } else if (i == 2) {
      return (
        <PlotPPG
          options={opts}
          data={datas[0]["B9_11_PPG_avg"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 3) {
      return <PlotX options={opts} data={datas[0]["B27_28_X"]} state={state} limit={limit}/>;
    } else if (i == 4) {
      return <PlotY options={opts} data={datas[0]["B29_30_Y"]} state={state} limit={limit}/>;
    } else {
      return <PlotZ options={opts} data={datas[0]["B31_32_Z"]} state={state} limit={limit}/>;
    }
  }

  const handleChanges = (event) => {
    var string = event.target.value.split(",")
    setLimit([string[0], string[1]]);
  }
  function roop(i) {
    return (
      <Box>
        <h3
          style={{
            color: "white",
            display: "inline",
            marginLeft: 50,
            marginTop: 20,
          }}
        >
          {signal_names[i]}
        </h3>
        <FormControl
          style={{
            float: "right",
            display: "inline",
            marginRight: "8%",
          }}
        >
          <NativeSelect
            defaultValue={[10 ,i]}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
              fontFamily: "GmarketSansMedium",
            }}
            style={{
              textAlign: "right",
              backgroundColor: "white",
              width: 100,
              fontFamily: "GmarketSansMedium",
            }}
            onChange={handleChanges}
          >
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[5 ,i]}>
              5sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[10 ,i]}>
              10sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[30 ,i]}>
              30sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[60 ,i]}>
              1min
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[300 ,i]}>
              5min
            </option>
          </NativeSelect>
        </FormControl>
        <Box
          style={{
            border: " 2px solid white",
            marginTop: 20,
            width: "80%",
            height: 250,
            marginLeft: 50,
            backgroundColor: "white",
            marginBottom: 30,
          }}
        >
          <Box style={{ marginLeft: 30 }}>{list(i)}</Box>
        </Box>
      </Box>
    );
  }
  return (
    <div id="chartlist" style={{ width: "100%", height: "auto" }}>
      {roop(0)}
      {roop(1)}
      {roop(2)}
      {roop(3)}
      {roop(4)}
      {roop(5)}
    </div>
  );
}

export default ExperimentMachineListPageMiddle;
