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
const GRAPH_WIDTH_SEC_DEFAULT = 10;
var graph_width_sec = [];
const lineArr = [];
var lineArr_display = [];
var signal_frequency_list = [];
var chart = [];

function ExperimentMachineListPageMiddle(props) {
  const datas = props.data;
  const state = props.state;

  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];

  const opts = {
    width: 1350,
    height: 200,
    pxAlign: false,
    scales: {
      y: {
        auto: true,
      },
    },
    series: [
      {},
      {
        label: "Sine",
        stroke: "red",
      },
    ],
  };

  function init() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
      lineArr[i] = [];
      graph_width_sec[i] = GRAPH_WIDTH_SEC_DEFAULT;
      lineArr_display[i] = [];
      signal_frequency_list[i] = 50;
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
        <PlotEEG1 options={opts} data={datas[0]["B3_5_EEG1"]} state={state} />
      );
    } else if (i == 1) {
      return (
        <PlotEEG2 options={opts} data={datas[0]["B6_8_EEG2"]} state={state} />
      );
    } else if (i == 2) {
      return (
        <PlotPPG
          options={opts}
          data={datas[0]["B9_11_PPG_avg"]}
          state={state}
        />
      );
    } else if (i == 3) {
      return <PlotX options={opts} data={datas[0]["B27_28_X"]} state={state} />;
    } else if (i == 4) {
      return <PlotY options={opts} data={datas[0]["B29_30_Y"]} state={state} />;
    } else {
      return <PlotZ options={opts} data={datas[0]["B31_32_Z"]} state={state} />;
    }
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
            defaultValue={5}
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
          >
            <option style={{ fontFamily: "GmarketSansMedium" }} value={5}>
              5sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={10}>
              10sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={30}>
              30sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={60}>
              1min
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={300}>
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
            marginBottom: 30
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
