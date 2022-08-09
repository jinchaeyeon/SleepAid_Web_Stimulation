import React from "react";
import { FormControl, NativeSelect, Box } from "@mui/material";
import getRealTimeChart from "./realtime_chart";

const d3 = document.createElement("script");

d3.src = "https://d3js.org/d3.v4.min.js";
d3.async = true;
const GRAPH_WIDTH_SEC_DEFAULT = 10;

var graph_width_sec = [];
var g_recv_idx = 0;
var lineArr = [];
var lineArr_display = [];
var signal_frequency_list = [];
var last_upload_time = 0;
var chart = [];
var protocol_exp_id = null;
function ExperimentMachineListPageMiddle(props) {
  const machine = props.machine;
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  const raw_signals = signal_names;
  function init() {
    var current_state = "Start";

    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
      lineArr[i] = [];
      graph_width_sec[i] = GRAPH_WIDTH_SEC_DEFAULT;
      lineArr_display[i] = [];
      signal_frequency_list[i] = 50;
    }

    var update_timer = window.setInterval(updateData, 500);
    var upload_timer = window.setInterval(uploadData, 4000);
    // loadAndDisplayTableEvent(1);
  }

  function getDataBetweenTimes(lt, ct, arr) {
    var over_lasttime_indx = 0;
    var beforeorsame_curtime_indx = arr.length - 1;

    for (var i = arr.length - 1; i >= 0; i--) {
      //if(arr[i].time.getTime()>ct)
      if (arr[i].time > ct) beforeorsame_curtime_indx = i - 1;

      over_lasttime_indx = i + 1;

      //if(arr[i].time.getTime()<=lt)
      if (arr[i].time <= lt) break;
    }
    if (beforeorsame_curtime_indx == -1) beforeorsame_curtime_indx = 0;

    return arr.slice(over_lasttime_indx, beforeorsame_curtime_indx);
  }

  function uploadData() {
    var now = new Date();
    //current_upload_time=now.getTime()-60000;

    var current_upload_time = g_recv_idx - 5000;

    var upload_data = [];
    var chartCnt = 6;

    // if (current_state != "Pause") {
    for (var i = 0; i < chartCnt; i++) {
      if (lineArr[i].length > 0) {
        var willBeUploadedDataArr = getDataBetweenTimes(
          last_upload_time,
          current_upload_time,
          lineArr[i]
        );
        console.log(
          "willBeUploadedDataArr : [" +
            i +
            "]" +
            raw_signals[i] +
            " for " +
            last_upload_time +
            "~" +
            current_upload_time
        );

        RemoveOldData(i); //10분 이상된 데이터는 삭제

        upload_data = upload_data.concat(
          willBeUploadedDataArr.map(function (obj) {
            var rObj = {};
            rObj["proto_exp_id"] = protocol_exp_id;
            rObj["code"] = raw_signals[i];
            //rObj["time"] = obj.time.getTime();
            rObj["time"] = obj.time;
            rObj["v"] = obj.x;

            return rObj;
          })
        );
      }
      // }
      last_upload_time = current_upload_time;
      //console.log(upload_data);
    }
  }
  function RemoveOldData(chart_idx) {
    var now = new Date();
    //var t=now.getTime()-600000*4;//40분
    var t = g_recv_idx - 100000;
    var idxForRemoveBeforeThisPosition = 0;
    /*           for(var i=(lineArr[chart_idx].length-1);i>=0;i--)
    {
      if(lineArr[chart_idx][i].time.getTime()<=t)
      {
        idxForRemoveBeforeThisPosition=i;
        break;
      }
    }
*/

    for (var i = lineArr[chart_idx].length - 1; i >= 0; i--) {
      if (lineArr[chart_idx][i].time <= t) {
        idxForRemoveBeforeThisPosition = i;
        break;
      }
    }

    var idxForRemoveBeforeThisPosition;
    if (idxForRemoveBeforeThisPosition > 0) {
      lineArr[chart_idx].splice(0, idxForRemoveBeforeThisPosition);
      console.log(
        raw_signals[chart_idx] +
          "| old part removed:from 0 to " +
          idxForRemoveBeforeThisPosition
      );
    }
  }
  function updateData() {
    //     if (current_state == "Pause") {
    //       for (i = 0; i < chart.length; i++) {
    //         /*               d3.selectAll("g.axis.y").interrupt();
    //          d3.selectAll("defs clipPath rect").interrupt();
    // */ d3.selectAll("#chart" + i + " path.data").interrupt();
    //       }

    //       return;
    //     }

    for (var i = 0; i < chart.length; i++) {
      if (lineArr[i].length > 0) {
        var spoint =
          lineArr[i].length - 1 - graph_width_sec[i] * signal_frequency_list[i];
        if (spoint < 0) spoint = 0;

        lineArr_display[i] = lineArr[i].slice(spoint, lineArr[i].length - 1);

        d3.select("#chart" + i)
          .datum(lineArr_display[i])
          .call(chart[i]);
      }
    }
  }

  {
    init();
  }
  //   function onDataRecv(t, eeg1, eeg2, ppg, x, y, z) {
  //     console.log(t);
  //     if (current_state != "Pause") {
  //       var tt = new Date();
  //       /*     tt.setTime(t);
  //         tt.setMilliseconds(t%1000);

  //         console.log("T:"+t+"/"+tt+":"+tt);
  //         console.log(" tt.getMilliseconds():"+ tt.getMilliseconds());
  //      */
  //       tt = t;
  //       var lineData = [];
  //       lineData[0] = { time: tt, x: eeg1, m: "" };
  //       lineData[1] = { time: tt, x: eeg2, m: "" };
  //       lineData[2] = { time: tt, x: ppg, m: "" };
  //       lineData[3] = { time: tt, x: x, m: "" };
  //       lineData[4] = { time: tt, x: y, m: "" };
  //       lineData[5] = { time: tt, x: z, m: "" };

  //       for (var i = 0; i < 6; i++) {
  //         lineArr[i].push(lineData[i]);
  //         if (lineArr[i].length > max_time_width_sec * signal_frequency_list[i]) {
  //           lineArr[i].shift();
  //         }
  //       }
  //     }
  //   }

  function roop(i){
    return(
      <Box style={{ border: " 2px solid white", marginTop: 20, width: "90%", height: 60, marginLeft: 50}}>
      <h3 style={{ color: "white", display: "inline" }}>{signal_names[i]}</h3>
        <FormControl style={{ float: "right" }}>
          <NativeSelect
            defaultValue={5}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            style={{
              textAlign: "right",
              backgroundColor: "white",
              width: 70,
            }}
          >
            <option value={5}>5sec</option>
            <option value={10}>10sec</option>
            <option value={30}>30sec</option>
            <option value={60}>1min</option>
            <option value={300}>5min</option>
          </NativeSelect>
        </FormControl>
      </Box>
    )
  }
  return (
    <div id="chartlist" style={{ width: "100%", height: "67.2vh"}}>
        {roop(0)}
        {roop(1)}
        {roop(2)}
        {roop(3)}
        {roop(4)}
        {roop(5)}
      {/* <div id="chart'+i.toString()+'"></div>
        <hr /> */}
    </div>
  );
}

export default ExperimentMachineListPageMiddle;
