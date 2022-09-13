import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Slider,
  TextField,
} from "@mui/material";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Api from '../../../API/API';
import cookie from '../../../API/cookie';

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
var bluetoothService = null;
const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
export default function ExperimentPageModalMiddle(props) {
  const protocol_exp_id = window.location.href.split("/")[5];
  const time = props.data;
  const machine = props.machine;
  const [valueWidth, setValueWidth] = React.useState(200);
  const [valueDuration, setValueDuration] = React.useState(200);
  const [valueAmplitude, setValueAmplitude] = React.useState(4095);
  const [valueTime, setValueTime] = React.useState(300);
  const [list, setList] = React.useState([]);
  const handleWidthSliderChange = (event, newValue) => {
    setValueWidth(newValue);
  };

  const handleWidthInputChange = (event) => {
    setValueWidth(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleWidthBlur = () => {
    if (valueWidth < 0) {
      setValueWidth(0);
    } else if (valueWidth > 300) {
      setValueWidth(300);
    }
  };

  const handleDurationSliderChange = (event, newValue) => {
    setValueDuration(newValue);
  };

  const handleDurationInputChange = (event) => {
    setValueDuration(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleDurationBlur = () => {
    if (valueDuration < 0) {
      setValueDuration(0);
    } else if (valueDuration > 200) {
      setValueDuration(200);
    }
  };

  const handleAmplitudeSliderChange = (event, newValue) => {
    setValueAmplitude(newValue);
  };

  const handleAmplitudeInputChange = (event) => {
    setValueAmplitude(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleAmplitudeBlur = () => {
    if (valueAmplitude < 0) {
      setValueAmplitude(0);
    } else if (valueAmplitude > 4095) {
      setValueAmplitude(4095);
    }
  };

  const handleTimeSliderChange = (event, newValue) => {
    setValueTime(newValue);
  };

  const handleTimeInputChange = (event) => {
    setValueTime(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleTimeBlur = () => {
    if (valueTime < 0) {
      setValueTime(0);
    } else if (valueTime > 300) {
      setValueTime(300);
    }
  };

  const handleup = () => {
    setList([
      ...list,
      { width: valueWidth, Duration: valueDuration, Amplitude: valueAmplitude, Time: valueTime },
    ]);
    props.propFunction(false);
    AddStimulus(valueWidth, valueDuration, valueAmplitude, valueTime);
  };

  const handleElectronic = (width, duration, Amplitude, Time) => {
    props.propFunction(false);
    AddStimulus(width, duration, Amplitude, Time);
    setValueWidth(width);
    setValueDuration(duration);
    setValueAmplitude(Amplitude);
    setValueTime(Time)
  };

  React.useEffect(() => {
    const getData = async () => {
      const infoData = await Api.getAPI_Stimulus(protocol_exp_id, defaultValue);
      setList(infoData.data);
    };
    getData();

  }, []);

  function AddStimulus(width, duration, Amplitude, Time) {
    var id = protocol_exp_id;

    var obj = {
      proto_exp_id: id,
      intensity: width,
      interval: duration,
      height: Amplitude,
      long: Time,
      time: time,
    };

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
                deviceChar.writeValueWithoutResponse(uint8array_height);
              });
          });
      });

    const getData = async () => {
      const infoData = await Api.getPostStimulus(obj, defaultValue);
    };
    getData();
  }

  return (
    <Box style={{ color: "#CCCCCC", height: 300, display: "inline" }}>
      <Box
        style={{
          padding: "0px 10px 30px 10px",
          borderRadius: 5,
          width: "90%",
          marginRight: 10,
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
                step={10}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                type="number"
                style={{
                  display: "inline-block",
                  float: "right",
                  backgroundColor: "white",
                  width: 60,
                }}
                inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                onChange={handleWidthInputChange}
                onBlur={handleWidthBlur}
                value={valueWidth}
                variant="standard"
              />
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
                step={4}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                type="number"
                style={{
                  display: "inline-block",
                  float: "right",
                  backgroundColor: "white",
                  width: 60,
                }}
                inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                onChange={handleDurationInputChange}
                onBlur={handleDurationBlur}
                value={valueDuration}
                variant="standard"
              />
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
                step={1}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                type="number"
                style={{
                  display: "inline-block",
                  float: "right",
                  backgroundColor: "white",
                  width: 60,
                }}
                onChange={handleAmplitudeInputChange}
                onBlur={handleAmplitudeBlur}
                value={valueAmplitude}
                variant="standard"
                inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
              />
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
                max={200}
                step={4}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                type="number"
                style={{
                  display: "inline-block",
                  float: "right",
                  backgroundColor: "white",
                  width: 60,
                }}
                inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                onChange={handleTimeInputChange}
                onBlur={handleTimeBlur}
                value={valueTime}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        style={{
          padding: "0px 10px 30px 10px",
          border: "1px solid black",
          borderRadius: 5,
          width: "90%",
          marginBottom: 10,
        }}
      >
        <h4
          style={{
            marginTop: 5,
            marginBottom: 5,
            fontFamily: "GmarketSansMedium",
          }}
        >
          자극 목록
        </h4>
        <Box style={{ borderTop: "1px solid #000", paddingTop: 0 }}>
          <Grid container spacing={2} alignItems="center">
            {list.map((items, index) => (
              <Grid item xs={3} sm={3} md={3} key={index}>
                <Card key={index}>
                  <CardContent>
                    <h6
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: "GmarketSansMedium",
                      }}
                    >
                      width: {items.intensity}
                    </h6>
                    <h6
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: "GmarketSansMedium",
                      }}
                    >
                      Duration: {items.interval}
                    </h6>
                    <h6
                      style={{
                        marginTop: 0,
                        marginBottom: 5,
                        fontFamily: "GmarketSansMedium",
                      }}
                    >
                      Amplitude: {items.height}
                    </h6>
                    <h6
                      style={{
                        marginTop: 0,
                        marginBottom: 5,
                        fontFamily: "GmarketSansMedium",
                      }}
                    >
                      Time: {items.Time}
                    </h6>
                    <Button
                      onClick={() =>
                        handleElectronic(
                          items.intensity,
                          items.interval,
                          items.height
                        )
                      }
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: "GmarketSansMedium",
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      사용
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Button
        style={{
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginRight: 5,
          float: "right",
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleup}
      >
        save
      </Button>
    </Box>
  );
}
