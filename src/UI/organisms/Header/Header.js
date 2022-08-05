import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box style={{ width: "100%", height: "10vh", backgroundColor: "#191919", borderBottom: '2px solid #333333' }}>
        <Button
          style={{
            float: "right",
            marginRight: 20,
            color: "#CCCCCC",
            borderRadius: 50,
            backgroundColor: '#393939',
            height: 40,
            marginTop: 12
          }}
        >
          Log Out
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ float: "right", height: "100%", color: "#CCCCCC" }}
        >
          유저
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#A3A5B5",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default Header;
