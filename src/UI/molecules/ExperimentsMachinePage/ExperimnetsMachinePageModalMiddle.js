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

export default function ExperimentPageModalMiddle(props) {
  const [valueWidth, setValueWidth] = React.useState(200);
  const [valueDuration, setValueDuration] = React.useState(200);
  const [valueAmplitude, setValueAmplitude] = React.useState(4095);
  const [list, setList] = React.useState([
    { width: 200, Duration: 200, Amplitude: 2940 },
  ]);
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

  const handleup = () => {
    setList([
      ...list,
      { width: valueWidth, Duration: valueDuration, Amplitude: valueAmplitude },
    ]);
    props.propFunction(false);
  };
  
  const handleElectronic = () => {
    props.propFunction(false);
  };

  React.useEffect(() => {}, [valueWidth, valueDuration, valueAmplitude]);

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
          <h4 style={{ marginTop: 0, marginBottom: 5, fontFamily: 'GmarketSansMedium' }}>width</h4>
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
                inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
                onChange={handleWidthInputChange}
                onBlur={handleWidthBlur}
                value={valueWidth}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <h4 style={{ marginTop: 5, marginBottom: 5,fontFamily: 'GmarketSansMedium' }}>Duration (mS)</h4>
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
                inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
                onChange={handleDurationInputChange}
                onBlur={handleDurationBlur}
                value={valueDuration}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <h4 style={{ marginTop: 5, marginBottom: 5,fontFamily: 'GmarketSansMedium' }}>Amplitude (mA)</h4>
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
                inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
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
        <h4 style={{ marginTop: 5, marginBottom: 5,fontFamily: 'GmarketSansMedium' }}>자극 목록</h4>
        <Box style={{ borderTop: "1px solid #000", paddingTop: 0 }}>
          <Grid container spacing={2} alignItems="center">
            {list.map((items, index) => (
              <Grid item xs={3} sm={3} md={3} key={index}>
                <Card key={index}>
                  <CardContent>
                    <h6 style={{ marginTop: 0, marginBottom: 0,fontFamily: 'GmarketSansMedium' }}>
                      width: {items.width}
                    </h6>
                    <h6 style={{ marginTop: 0, marginBottom: 0,fontFamily: 'GmarketSansMedium' }}>
                      Duration: {items.Duration}
                    </h6>
                    <h6 style={{ marginTop: 0, marginBottom: 5,fontFamily: 'GmarketSansMedium' }}>
                      Amplitude: {items.Amplitude}
                    </h6>
                    <Button onClick={handleElectronic} style={{ marginTop: 0, marginBottom: 0,fontFamily: 'GmarketSansMedium' }} variant="outlined" size="small" fullWidth>사용</Button>
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
