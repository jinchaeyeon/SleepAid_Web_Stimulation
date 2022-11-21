import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Slider,
  TextField,
  Paper,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import { useEffect } from "react";
var g_recv_idx = 800;
var last = 0;
var bluetoothService = null;
const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
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
var id;

function ExperimentMachineListPageMiddle(props) {
  const datas = props.data;
  const machine = props.machine;
  const [valueWidth, setValueWidth] = React.useState(0);
  const [valueDuration, setValueDuration] = React.useState(20);
  const [valueAmplitude, setValueAmplitude] = React.useState(0);
  const [valueTime, setValueTime] = React.useState(0);
  const [valueLimit, setValueLimit] = React.useState(15);
  const starttime = props.starttime;
  const [Timer, setTimer] = React.useState(0);
  const [timestatus, settimeStatus] = React.useState(false);
  let endtime;
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  const [timestatus2, settimeStatus2] = React.useState(false);
  const [starttime2, setstarttime2] = React.useState(undefined);
  const [state, setstate] = React.useState(0);
  const [stateSetting, setstateSetting] = React.useState(0);
  let endtime2;
  setInterval(() => {
    setTimer(Timer + 1);
    uploadData();
  }, 1000);
  useEffect(() => {
    const getData = async () => {
      const infoBody = await Api.getAPI_ExperimentSubCreate();
      if (infoBody != null) {
        id = infoBody.data.id;
        console.log(id);
      }
    };
    getData();
  }, []);
  React.useEffect(() => {
    if (starttime2 == undefined) {
      if (!timestatus) {
        endtime = new Date();
        if (((endtime - starttime) / 1000) > 30) {
          console.log("down2");
          settimeStatus(true);
          bluetoothService = machine;
          bluetoothService
            .getCharacteristic(WRITE_UUID)
            .then(function (characteristic) {
              var deviceChar = characteristic;
              const cmd_intense = "100|0";
              var uint8array_intense = new TextEncoder().encode(cmd_intense);
              deviceChar
                .writeValueWithoutResponse(uint8array_intense);
            });
        }
      }
    } else {
      if (!timestatus2) {
        endtime2 = new Date();
        if (((endtime2 - starttime2) / (1000 * 60)) > valueLimit) {
          settimeStatus2(true);
          console.log("down");
          bluetoothService = machine;
          bluetoothService
            .getCharacteristic(WRITE_UUID)
            .then(function (characteristic) {
              var deviceChar = characteristic;
              const cmd_intense = "910|1";
              var uint8array_intense = new TextEncoder().encode(cmd_intense);
              deviceChar
                .writeValueWithoutResponse(uint8array_intense)
                .then(function () {
                  const cmd_interval = "100|0";
                  var uint8array_interval = new TextEncoder().encode(cmd_interval);
                  deviceChar
                    .writeValueWithoutResponse(uint8array_interval);
                });
            });
        }
      }
    }
  }, [Timer, starttime2])

  function uploadData() {
    const signal_names2 = [
      "B3_5_EEG1",
      "B6_8_EEG2",
      "B9_11_PPG_avg",
      "B27_28_X",
      "B29_30_Y",
      "B31_32_Z",
    ];
    for (var i = 0; i < 6; i++) {
      willBeUploadedDataArr.push({
        proto_exp_id: id,
        code: signal_names[i],
        time: datas["t"],
        v: datas[signal_names2[i]],
      });
    }
    if (g_recv_idx <= last) {
      const getData = async () => {
        const infoData = await Api.getAPI_PostData(willBeUploadedDataArr, defaultValue);
        console.log(infoData);
      };
      getData();
      g_recv_idx = g_recv_idx + 600;
      willBeUploadedDataArr = [];
    }
    last = datas["t"];
  }

  const handleWidthSliderChange = (event, newValue) => {
    setValueWidth(newValue);
  };

  const handleDurationSliderChange = (event, newValue) => {
    setValueDuration(newValue);
  };

  const handleAmplitudeSliderChange = (event, newValue) => {
    setValueAmplitude(newValue);
  };

  const handleTimeSliderChange = (event, newValue) => {
    if (newValue == 0) {
      newValue = valueDuration - valueWidth * 0.001;
    }
    setValueTime(newValue);
  };

  const handleLimitSliderChange = (event, newValue) => {
    setValueLimit(newValue);
  };

  const handleup = () => {
    AddStimulus(valueAmplitude, valueWidth, valueDuration, valueTime, valueLimit);
    setstate(1);
    setstateSetting(1);
  };

  const handleup2 = () => {
    AddStimulus(2047.5, 50, 200, 199.95, 15);
    setstate(2);
    setstateSetting(2);
  };

  const handleup3 = () => {
    AddStimulus(4095, 50, 100, 199.95, 15);
    setstate(3);
    setstateSetting(3);
  };

  React.useEffect(() => {
  }, [valueAmplitude, valueWidth, valueDuration, valueTime, valueLimit, state]);

  function AddStimulus(Amplitude, width, duration, Time, limit) {
    var sti_intensity = width;
    sti_intensity = parseInt(sti_intensity);
    var sti_interval = duration;
    sti_interval = parseInt(sti_interval);
    var sti_height = Amplitude;
    sti_height = parseInt(sti_height);
    var sti_long = Time;
    sti_long = parseInt(sti_long);

    bluetoothService = machine;
    bluetoothService
      .getCharacteristic(WRITE_UUID)
      .then(function (characteristic) {
        var deviceChar = characteristic;
        const cmd_intense2 = "910|2";
        var uint8array_intense2 = new TextEncoder().encode(cmd_intense2);
        deviceChar
          .writeValueWithoutResponse(uint8array_intense2)
          .then(function () {
            const cmd_intense = "102|" + sti_intensity;
            var uint8array_intense = new TextEncoder().encode(cmd_intense);
            deviceChar
              .writeValueWithoutResponse(uint8array_intense)
              .then(function () {
                const cmd_interval = "104|" + sti_interval;
                var uint8array_interval = new TextEncoder().encode(cmd_interval);
                deviceChar
                  .writeValueWithoutResponse(uint8array_interval)
                  .then(function () {
                    const cmd_height = "106|" + sti_height;
                    var uint8array_height = new TextEncoder().encode(cmd_height);
                    deviceChar.writeValueWithoutResponse(uint8array_height)
                      .then(function () {
                        const cmd_long = "110|" + sti_long;
                        var uint8array_long = new TextEncoder().encode(cmd_long);
                        deviceChar.writeValueWithoutResponse(uint8array_long);
                      });
                  });
              });
          });
      });
    setstarttime2(new Date());
    alert("자극 전달 완료");
  }

  function widthAmplitude() {
    if (valueAmplitude == 0) {
      return "0mA";
    } else if (valueAmplitude == 409.5) {
      return "0.1mA";
    } else if (valueAmplitude == 819) {
      return "0.2mA";
    } else if (valueAmplitude == 1228.5) {
      return "0.3mA";
    } else if (valueAmplitude == 1638) {
      return "0.4mA";
    } else if (valueAmplitude == 2047.5) {
      return "0.5mA";
    } else if (valueAmplitude == 2457) {
      return "0.6mA";
    } else if (valueAmplitude == 2866.5) {
      return "0.7mA";
    } else if (valueAmplitude == 3276) {
      return "0.8mA";
    } else if (valueAmplitude == 3685.5) {
      return "0.9mA";
    } else {
      return "1.0mA";;
    }
  }

  function widthTime() {
    if (valueTime == valueDuration - valueWidth * 0.001) {
      return "Off";
    } else if (valueTime == 500) {
      return "500ms";
    } else if (valueTime == 1000) {
      return "1000ms";
    } else if (valueTime == 1500) {
      return "1500ms";
    } else if (valueTime == 2000) {
      return "2000ms";
    } else {
      return "2500ms";
    }
  }

  return (
    <Paper
      style={{ height: "100vh", width: "100%", backgroundColor: "#131313" }}
    >
      <Box style={{ color: "#CCCCCC" }}>
        <Box
          style={{
            padding: "0px 10px 30px 10px",
            borderRadius: 5,
            width: "90%",
            marginRight: "5%",
            marginLeft: "5%",
          }}
        ><Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              진폭 (Amplitude, mA)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                {stateSetting == 2 || stateSetting == 3 ?
                  <Slider
                    disabled
                    value={typeof valueAmplitude === "number" ? valueAmplitude : 0}
                    onChange={handleAmplitudeSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={4095}
                    step={409.5}
                  /> : <Slider
                    value={typeof valueAmplitude === "number" ? valueAmplitude : 0}
                    onChange={handleAmplitudeSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={4095}
                    step={409.5}
                  />
                }
              </Grid>
              <Grid item>
                <h3>{widthAmplitude()}</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 0,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              파형폭 (Phase width, µs)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                {stateSetting == 2 || stateSetting == 3 ?
                  <Slider
                    disabled
                    value={typeof valueWidth === "number" ? valueWidth : 0}
                    onChange={handleWidthSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={300}
                    step={50}
                  /> : <Slider
                    value={typeof valueWidth === "number" ? valueWidth : 0}
                    onChange={handleWidthSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={300}
                    step={50}
                  />
                }
              </Grid>
              <Grid item>
                <h3>{valueWidth}µs</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              주기 (Pulse duration, ms)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                {stateSetting == 2 || stateSetting == 3 ?
                  <Slider
                    disabled
                    value={typeof valueDuration === "number" ? valueDuration : 0}
                    onChange={handleDurationSliderChange}
                    aria-labelledby="input-slider"
                    min={20}
                    max={200}
                    step={20}
                  /> : <Slider
                    value={typeof valueDuration === "number" ? valueDuration : 0}
                    onChange={handleDurationSliderChange}
                    aria-labelledby="input-slider"
                    min={20}
                    max={200}
                    step={20}
                  />
                }
              </Grid>
              <Grid item>
                <h3>{valueDuration}ms</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              꺼짐 간격 (Off-time, ms)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                {stateSetting == 2 || stateSetting == 3 ?
                  <Slider
                    disabled
                    value={typeof valueTime === "number" ? valueTime : 0}
                    onChange={handleTimeSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={2500}
                    step={500}
                  /> : <Slider
                    value={typeof valueTime === "number" ? valueTime : 0}
                    onChange={handleTimeSliderChange}
                    aria-labelledby="input-slider"
                    min={0}
                    max={2500}
                    step={500}
                  />
                }
              </Grid>
              <Grid item>
                <h3>{widthTime()}</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              타이머 (Timer, min)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                {stateSetting == 2 || stateSetting == 3 ?
                  <Slider
                    disabled
                    value={typeof valueLimit === "number" ? valueLimit : 0}
                    onChange={handleLimitSliderChange}
                    aria-labelledby="input-slider"
                    min={15}
                    max={60}
                    step={15}
                  /> : <Slider
                    value={typeof valueLimit === "number" ? valueLimit : 0}
                    onChange={handleLimitSliderChange}
                    aria-labelledby="input-slider"
                    min={15}
                    max={60}
                    step={15}
                  />
                }
              </Grid>
              <Grid item>
                <h3>{valueLimit}min</h3>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography sx={{ fontSize: 25, fontFamily: "GmarketSansMedium" }} color="white" >
              자극 메뉴얼
            </Typography>
            <Grid container>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                {state == 1 ? <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      자율조절 모드
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      진폭 (Amplitude, mA): {widthAmplitude()}
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      파형폭 (phase width, µs): {valueWidth}µs
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      주기 (pulse duration, ms): {valueDuration}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      꺼짐 간격 (off-time, ms): {valueTime}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      타이머 (timer, min): {valueLimit}min
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card> : <Card sx={{ width: "90%", backgroundColor: "#808080" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      자율조절 모드
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      진폭 (Amplitude, mA): {widthAmplitude()}
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      파형폭 (phase width, µs): {valueWidth}µs
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      주기 (pulse duration, ms): {valueDuration}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      꺼짐 간격 (off-time, ms): {valueTime}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      타이머 (timer, min): {valueLimit}min
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>}
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                {state == 2 ? <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 약
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup2}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card> : <Card sx={{ width: "90%", backgroundColor: "#808080" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 약
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup2}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
                }
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                {state == 3 ? <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 강
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup3}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card> : <Card sx={{ width: "90%", backgroundColor: "#808080" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 강
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup3}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default ExperimentMachineListPageMiddle;
