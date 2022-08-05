import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <Box
        style={{
          width: "100%",
          height: "10vh",
          backgroundColor: "#191919",
          borderBottom: "2px solid #333333",
        }}
      >
        <Link to="/">
          <Button
            style={{
              float: "right",
              marginRight: 20,
              color: "#CCCCCC",
              borderRadius: 40,
              backgroundColor: "#393939",
              height: 40,
              marginTop: 18,
            }}
          >
            Log Out
          </Button>
        </Link>
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
