import React from "react";

const GRAPH_WIDTH_SEC_DEFAULT = 10;

var graph_width_sec = [];

var lineArr = [];
var lineArr_display = [];
var signal_frequency_list = [];

var chart = [];

function ExperimentMachineListPageMiddle(props) {
  const machine = props.machine;
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  const raw_signals = signal_names;
  //   function init() {
  //     current_state = "Start";

  //     for (i = 0; i < 6; i++) {
  //       chart[i] = getRealTimeChart();
  //       lineArr[i] = [];
  //       graph_width_sec[i] = GRAPH_WIDTH_SEC_DEFAULT;
  //       lineArr_display[i] = [];
  //       signal_frequency_list[i] = 50;
  //     }
  //     update_timer = window.setInterval(updateData, 500);
  //     upload_timer = window.setInterval(uploadData, 4000);
  //     loadAndDisplayTableEvent(1);
  //   }

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

  function h() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
      lineArr[i] = [];
      graph_width_sec[i] = GRAPH_WIDTH_SEC_DEFAULT;
      lineArr_display[i] = [];
      signal_frequency_list[i] = 50;
    }
  }
  return (
    <div id="chartlist" style={{ width: "100%", height: "70vh" }}>
      <div
        id="additional_chart_container_'+signal_names[i]+'"
        class="additional_chart_container"
      >
        <div style="text-align:right">
          <select
            name="graph_width"
            id="graph_width"
            onchange="graph_width_change('+i+',this.value)"
          >
            <option value="5">5SEC</option>
            <option value="10" selected>
              10SEC
            </option>
            <option value="30">30SEC</option>
            <option value="60">1 min</option>
            <option value="300">5 min</option>
          </select>
        </div>
        <h2>{signal_names[0]}</h2>
        <div id="chart'+i.toString()+'"></div>
        <hr />
      </div>
    </div>
  );
}

export default ExperimentMachineListPageMiddle;
