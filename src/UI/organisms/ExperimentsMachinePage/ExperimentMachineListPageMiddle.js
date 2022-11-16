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
  const [valueWidth, setValueWidth] = React.useState(300);
  const [valueDuration, setValueDuration] = React.useState(200);
  const [valueAmplitude, setValueAmplitude] = React.useState(4095);
  const [valueTime, setValueTime] = React.useState(300);
  const [valueLimit, setValueLimit] = React.useState(30);
  const starttime = props.starttime;
  const [Timer, setTimer] = React.useState(0);
  const [timestatus, settimeStatus] = React.useState(false);
  let endtime;
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  const [timestatus2, settimeStatus2] = React.useState(false);
  const [starttime2, setstarttime2] = React.useState(undefined);
  let endtime2;
  setInterval(() => {
    setTimer(Timer + 1);
    uploadData();
  }, 1000);
  useEffect(()=> {
   const getData = async () => {
     const infoBody = await Api.getAPI_ExperimentSubCreate();
     if (infoBody != null) {
       id = infoBody.data.id;
       console.log(id);
     }
   };
   getData();
  },[]);
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
    setValueTime(newValue);
  };

  const handleLimitSliderChange = (event, newValue) => {
    setValueLimit(newValue);
  };

  const handleup = () => {
    AddStimulus(valueWidth, valueDuration, valueAmplitude, valueTime, valueLimit);
  };

  const handleup1 = () => {
    AddStimulus(250, 50, 400, 100, 15);
  };

  const handleup2 = () => {
    AddStimulus(250, 50, 200, 100, 15);
  };

  const handleup3 = () => {
    AddStimulus(250, 50, 100, 100, 15);
  };

  React.useEffect(() => {
  }, []);

  function AddStimulus(width, duration, Amplitude, Time, limit) {
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
        const cmd_intense = "910|2";
        var uint8array_intense = new TextEncoder().encode(cmd_intense)
          .then(function (characteristic) {
            var deviceChar = characteristic;
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

  function widthValue() {
    if (valueWidth == 0) {
      return 0;
    } else if (valueWidth == 30) {
      return 1;
    } else if (valueWidth == 60) {
      return 2;
    } else if (valueWidth == 90) {
      return 3;
    } else if (valueWidth == 120) {
      return 4;
    } else if (valueWidth == 150) {
      return 5;
    } else if (valueWidth == 180) {
      return 6;
    } else if (valueWidth == 210) {
      return 7;
    } else if (valueWidth == 240) {
      return 8;
    } else if (valueWidth == 270) {
      return 9;
    } else {
      return 10;
    }
  }

  function widthDuration() {
    if (valueDuration == 0) {
      return 0;
    } else if (valueDuration == 20) {
      return 1;
    } else if (valueDuration == 40) {
      return 2;
    } else if (valueDuration == 60) {
      return 3;
    } else if (valueDuration == 80) {
      return 4;
    } else if (valueDuration == 100) {
      return 5;
    } else if (valueDuration == 120) {
      return 6;
    } else if (valueDuration == 140) {
      return 7;
    } else if (valueDuration == 160) {
      return 8;
    } else if (valueDuration == 180) {
      return 9;
    } else {
      return 10;
    }
  }

  function widthAmplitude() {
    if (valueAmplitude == 0) {
      return 0;
    } else if (valueAmplitude == 409.5) {
      return 1;
    } else if (valueAmplitude == 819) {
      return 2;
    } else if (valueAmplitude == 1228.5) {
      return 3;
    } else if (valueAmplitude == 1638) {
      return 4;
    } else if (valueAmplitude == 2047.5) {
      return 5;
    } else if (valueAmplitude == 2457) {
      return 6;
    } else if (valueAmplitude == 2866.5) {
      return 7;
    } else if (valueAmplitude == 3276) {
      return 8;
    } else if (valueAmplitude == 3685.5) {
      return 9;
    } else {
      return 10;
    }
  }

  function widthTime() {
    if (valueTime == 0) {
      return 0;
    } else if (valueWidth == 30) {
      return 1;
    } else if (valueTime == 60) {
      return 2;
    } else if (valueTime == 90) {
      return 3;
    } else if (valueTime == 120) {
      return 4;
    } else if (valueTime == 150) {
      return 5;
    } else if (valueTime == 180) {
      return 6;
    } else if (valueTime == 210) {
      return 7;
    } else if (valueTime == 240) {
      return 8;
    } else if (valueTime == 270) {
      return 9;
    } else {
      return 10;
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
        >
          <Box>
            <h4
              style={{
                marginTop: 0,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              width
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueWidth === "number" ? valueWidth : 0}
                  onChange={handleWidthSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={300}
                  step={30}
                />
              </Grid>
              <Grid item>
                <h3>{widthValue()}</h3>
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
              Duration (mS)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueDuration === "number" ? valueDuration : 0}
                  onChange={handleDurationSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={200}
                  step={20}
                />
              </Grid>
              <Grid item>
                <h3>{widthDuration()}</h3>
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
              Amplitude (mA)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueAmplitude === "number" ? valueAmplitude : 0}
                  onChange={handleAmplitudeSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={4095}
                  step={409.5}
                />
              </Grid>
              <Grid item>
                <h3>{widthAmplitude()}</h3>
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
              Time (mS)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueTime === "number" ? valueTime : 0}
                  onChange={handleTimeSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={300}
                  step={30}
                />
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
              limit (m)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueLimit === "number" ? valueLimit : 0}
                  onChange={handleLimitSliderChange}
                  aria-labelledby="input-slider"
                  min={5}
                  max={30}
                  step={5}
                />
              </Grid>
              <Grid item>
                <h3>{valueLimit}</h3>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography sx={{ fontSize: 25, fontFamily: "GmarketSansMedium" }} color="white" >
              자극 메뉴얼
            </Typography>
            <Grid container>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      1번
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      width: 250
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      duration: 50
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      amplitude: 400
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Time: 100
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Limit: 15
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
                      onClick={handleup1}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      2번
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      width: 250
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      duration: 50
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      amplitude: 200
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Time: 100
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Limit: 15
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
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      3번
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      width: 250
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      duration: 50
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      amplitude: 100
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Time: 100
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      Limit: 15
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
              </Grid>
            </Grid>
          </Box>
          <Button
            style={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "#2877b9",
              marginTop: 50,
              float: "right",
              fontFamily: "GmarketSansMedium",
            }}
            onClick={handleup}
          >
            자극 설정
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ExperimentMachineListPageMiddle;
