import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Modal from "./Login/Modal";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import newAxios from "./Axios";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { userDetails, setUserDetails } = useContext(authContext);

  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateToHomepage = () => {
    navigate("/");
  };

  const handleLogOut = async () => {
    try {
      await newAxios.get(`/users/logout`);
      setUserDetails('');
      navigateToHomepage();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayNow = () => {
    navigate("/gamescreen");
  };

  return (
    <AppBar
      className="AppContainer"
      position="static"
      sx={{ backgroundColor: "#b25c5c" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RocketLaunchIcon />
          <Typography
            variant="h6"
            className="Header"
            onClick={navigateToHomepage}
          >
            Galaxy Smashers
          </Typography>
        </Box>
        <Box>
          {userDetails ? (
            <>
              <Button
                onClick={handlePlayNow}
                sx={{ my: 2, mr: 2, color: "white" }}
              >
                Play now
              </Button>
              <Button
                onClick={(e) => handleLogOut(e)}
                sx={{ my: 2, color: "white" }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button onClick={() => handleOpen()} sx={{ my: 2, color: "white" }}>
              Log in
            </Button>
          )}
          {userDetails && (
            <AccountCircleIcon
              variant="h6"
              className="Header"
              onClick={() => navigate("/profile")}
            />
          )}
        </Box>
      </Toolbar>
      <Modal open={open} handleClose={handleClose} />
    </AppBar>
  );
};

export default NavBar;
