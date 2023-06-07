import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Modal from "./Login/Modal";
import { useNavigate } from "react-router-dom";
import { UserContext, authContext } from "../context/authContext";
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
      setUserDetails("");
      navigateToHomepage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar
      className="AppContainer"
      position="static"
      sx={{ backgroundColor: "#483D8B" }}
    >
      <Toolbar>
        <RocketLaunchIcon />
        <Typography
          on
          variant="h6"
          className="Header"
          onClick={navigateToHomepage}
        >
          Galaxy Smashers
        </Typography>
        <Box
          sx={{ flexGrow: 0, display: { xs: "flex", sm: "flex", md: "flex" } }}
        >
          {userDetails ? (
            <Button
              onClick={(e) => handleLogOut(e)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => handleOpen()}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Log in
            </Button>
          )}
        </Box>
        {userDetails && <AccountCircleIcon
          on
          variant="h6"
          className="Header"
          onClick={() => navigate("/profile")}
        />}
      </Toolbar>
      <Modal open={open} handleClose={handleClose} />
    </AppBar>
  );
};

export default NavBar;
