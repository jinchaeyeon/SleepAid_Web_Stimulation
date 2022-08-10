import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./styles.css";
import moment from "moment";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const color = Chart.helpers.color;
const data = {
  datasets: [
    {
      backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
      borderColor: chartColors.purple,
      fill: false,
      lineTension: 0,
      borderDash: [10, 0],
      data: [],
    },
  ],
};

const options = {
  elements: {
    line: {
      tension: 1,
    },
  },
  legend: {
    display: false,
  },
  responsive: false,
  scales: {
    xAxes: [
      {
        type: "realtime",
        distribution: "linear",
        realtime: {
          onRefresh: function (chart) {
            chart.data.datasets[0].data.push({
              x: moment(),
              y: Math.random(),
            });
          },
          delay: 1,
          time: {
            displayFormat: "h:mm",
          },
        },
        ticks: {
          display: false,
          displayFormats: 1,
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 30,
          minUnit: "second",
          source: "auto",
          autoSkip: true,
          callback: function (value) {
            return moment(value, "HH:mm:ss").format("mm:ss");
          },
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
          max: 1,
          min: 0,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

var widths = window.innerWidth - 50;
function App() {
  return (
    <div className="App">
      <Line data={data} options={options} width={widths} />
    </div>
  );
}

export default App;
