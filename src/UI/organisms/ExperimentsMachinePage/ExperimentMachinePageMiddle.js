import * as React from "react";
import { Button, Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 400,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExperimentMachinePageMiddle(props) {

  function handleprops(characteristic) {
    props.propFunction(characteristic);
  }
  var bluetoothService = null;
  DataView.prototype.getUint24 = function(pos) {
    return (this.getUint16(pos) << 8) + this.getUint8(pos+2);
  }
  DataView.prototype.getInt24 = function(pos) {
    return (this.getInt16(pos) << 8) + this.getUint8(pos+2);
  }
  const CURRENT_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const NOTIFY_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
  const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  let options = {
    filters: [{ services: [CURRENT_SERVICE_UUID] }],
    optionalServices: ["generic_access"],
  };

  function connectDevice() {
    navigator.bluetooth
      .requestDevice(options)
      .then(function (device) {

        var wbdevice = device;
        return wbdevice.gatt.connect().then(function (server) {
          // Getting primary service from device with passed uuid
          return server
            .getPrimaryService(CURRENT_SERVICE_UUID)
            .then(function (service) {

              bluetoothService = service;
              service
                .getCharacteristic(WRITE_UUID)
                .then(function (characteristic) {
                  var deviceChar = characteristic;
                  const cmd = "910|2";

                  var uint8array = new TextEncoder().encode(cmd);

                  deviceChar
                    .writeValueWithoutResponse(uint8array);
                });

              return service
                .getCharacteristic(NOTIFY_UUID)
                .then(function (characteristic) {
                  {handleprops(characteristic)}
                });
            });
        });
      })
  }
  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <h3
        style={{
          position: "absolute",
          color: "white",
          top: "40%",
          left: "35%",
          fontFamily: 'GmarketSansMedium'
        }}
      >
        블루투스 기기의 전원을 켜고 아래의 Connect 버튼을 눌러 기기를
        연결해주세요.
      </h3>
      <Button
        onClick={connectDevice}
        style={{
          position: "absolute",
          color: "white",
          top: "50%",
          left: "48%",
          fontFamily: 'GmarketSansMedium'
        }}
        variant="contained"
      >
        Connect
      </Button>
    </Paper>
  );
}
