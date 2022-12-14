import React from "react";
import {Box} from '@mui/material'
import cookie from "../../../API/cookie";

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

const is_staff = cookie.getCookie('is_staff') ? cookie.getCookie('is_staff') : "false";

const Sidebar = () => {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <>
      <Box style={{ width: 300, height: "auto", display: "block", backgroundColor: "#333333"}}>
        <Box
          style={{
            justifyContent: "center",
            display: "flex",
            height: 66,
            alignItems: "center",
          }}
        >
          <a href="/">
            <img
              style={{ width: "auto", height: 30, paddingRight: 20 }}
              alt="home icon"
              src={`${publicUrl}/logo.png`}
            />
          </a>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;