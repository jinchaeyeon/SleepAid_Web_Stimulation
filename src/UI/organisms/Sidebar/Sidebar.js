import React from "react";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import {Box} from '@mui/material'

const Sidebar = () => {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <>
      <Box style={{ width: 300, height: "100vh", display: "block", backgroundColor: "#333333"}}>
        <Box
          style={{
            justifyContent: "center",
            display: "flex",
            height: 66,
            alignItems: "center",
          }}
        >
          <a href="/Experiments">
            <img
              style={{ width: "auto", height: 30, paddingRight: 20 }}
              alt="home icon"
              src={`${publicUrl}/logo.png`}
            />
          </a>
        </Box>
        <Box>
          <Box>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
