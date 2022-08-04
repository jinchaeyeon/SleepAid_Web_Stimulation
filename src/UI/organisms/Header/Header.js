import { Box, Button, Menu, MenuItem } from "@mui/material";
import {useState} from 'react';

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
      <Box style={{ width: "100%", height: 66, backgroundColor: "#191919"}}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{float: 'right', height: "100%"}}
        >
          유저
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem style={{backgroundColor:'#A3A5B5'}} onClick={handleClose}>Change Password</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default Header;
