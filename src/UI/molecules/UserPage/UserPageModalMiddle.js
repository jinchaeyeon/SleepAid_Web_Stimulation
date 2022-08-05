import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function UserPageModalMiddle(props) {
  const [text, setText] = React.useState(props.Email.Email);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Box style={{ color: "#CCCCCC", height: 132 }}>
      <Box
        style={{
          padding: "10px 10px 30px 10px",
          marginBottom: 24,
          border: "1px solid black",
          borderRadius: 5,
        }}
      >
        <h4 style={{ display: "inline", paddingLeft: "15%" }}>Email :</h4>
        <TextField
          value={text}
          size="small"
          style={{
            float: "right",
            width: "50%",
            marginRight: "20%",
            backgroundColor: "white",
          }}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button
          style={{
            color: "white",
            borderRadius: 10,
            backgroundColor: "#5e646b",
            marginRight: 5,
            float: "right",
          }}
          onClick={() => props.propFunction(props, null)}
        >
          cancel
        </Button>
        <Button
          style={{
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2877b9",
            marginRight: 5,
            float: "right",
          }}
          onClick={() => props.propFunction(props, text)}
        >
          save
        </Button>
      </Box>
    </Box>
  );
}
