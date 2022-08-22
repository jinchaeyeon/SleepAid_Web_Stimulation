import React, { useEffect } from "react";
import { FormControl, NativeSelect, Box } from "@mui/material";
import getRealTimeChart from "./realtime_chart";
import PlotEEG1 from "./PlotEEG1";
import PlotEEG2 from "./PlotEEG2";
import PlotPPG from "./PlotPPG";
import PlotX from "./PlotX";
import PlotY from "./PlotY";
import PlotZ from "./PlotZ";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

var g_recv_idx = 800;
var last = 0;
const d3 = document.createElement("script");
d3.src = "https://d3js.org/d3.v4.min.js";
d3.async = true;
var chart = [];
const id = window.location.href.split("/")[5];
var willBeUploadedDataArr = [];

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

function ExperimentMachineListPageMiddle(props) {
  const datas = props.data;
  const state = props.state;
  const [limit, setLimit] = React.useState([]);
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  const widths = window.innerWidth * 0.6;

  const opts = {
    width: widths,
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
      { label: "데이터 갯수" },
      {
        label: "값",
        stroke: "blue",
      },
    ],
  };

  function init() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
    }
    var upload_timer = window.setInterval(uploadData, 4000);
  }

  {
    init();
  }

  function uploadData() {
    const signal_names2 = [
      "B3_5_EEG1",
      "B6_8_EEG2",
      "B9_11_PPG_avg",
      "B27_28_X",
      "B29_30_Y",
      "B31_32_Z",
    ];
    if (state != "Pause") {
      for (var i = 0; i < 6; i++) {
        willBeUploadedDataArr.push({
          proto_exp_id: id,
          code: signal_names[i],
          time: datas[0]["t"],
          v: datas[0][signal_names2[i]],
        });
      }

      if (g_recv_idx <= last) {
         const getData = async () => {
          const infoData = await Api.getAPI_PostData(willBeUploadedDataArr,defaultValue);
        };
        getData();
        g_recv_idx = g_recv_idx+ 600;
        willBeUploadedDataArr = [];
      }
      last = datas[0]["t"];
    }
  }

  function list(i) {
    if (datas[0] == undefined) {
      return 0;
    } else if (i == 0) {
      return (
        <PlotEEG1
          options={opts}
          data={datas[0]["B3_5_EEG1"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 1) {
      return (
        <PlotEEG2
          options={opts}
          data={datas[0]["B6_8_EEG2"]}
          state={state}
          limit={limit}
        />
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
      return (
        <PlotX
          options={opts}
          data={datas[0]["B27_28_X"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 4) {
      return (
        <PlotY
          options={opts}
          data={datas[0]["B29_30_Y"]}
          state={state}
          limit={limit}
        />
      );
    } else {
      return (
        <PlotZ
          options={opts}
          data={datas[0]["B31_32_Z"]}
          state={state}
          limit={limit}
        />
      );
    }
  }

  const handleChanges = (event) => {
    var string = event.target.value.split(",");
    setLimit([string[0], string[1]]);
  };
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
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[10, i]}>
              10sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[30, i]}>
              30sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[60, i]}>
              1min
            </option>
            <option
              style={{ fontFamily: "GmarketSansMedium" }}
              value={[180, i]}
            >
              3min
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
