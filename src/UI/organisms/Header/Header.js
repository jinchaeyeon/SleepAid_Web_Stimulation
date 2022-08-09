import * as React from 'react';
import { Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderModalHeader from '../../molecules/Header/HeaderModalHeader';
import HeaderModalMiddle from '../../molecules/Header/HeaderModalMiddle';

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

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [state, setState] = React.useState([]);

  const handleCloseTrue = () => {
    setOpenTrue(false);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenTrue(true);
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
        <Link to="/" style={{ textDecoration: "none" }}>
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
        <Modal
            open={openTrue}
            onClose={handleCloseTrue}
            BackdropProps={{ style: { opacity: 0.2 } }}
          >
            <Box sx={style}>
              <HeaderModalHeader propFunction={handleCloseTrue} />
              <HeaderModalMiddle propFunction={handleCloseTrue} />
            </Box>
          </Modal>
      </Box>
    </>
  );
}

export default Header;
