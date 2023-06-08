import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Login from './Login';
import Signup from './Signup';
import IconButton from '@mui/material/IconButton';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '@media (max-width: 768px)': {
    width:'100%'
  }
};

const UserModal = ({ open, handleClose }) => {
  const [currentRequest, setCurrentRequest] = useState('Login')

  const handleSignUpClick = () => {
    setCurrentRequest('Signup');
  }

  const handleLoginClick = () => {
    setCurrentRequest('Login');
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", marginBottom: "15px" }}>
          <Button
            variant="contained"
            className="UserModalButton"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
          <IconButton>
            <LoginIcon />
          </IconButton>
          <Button
            variant="contained"
            className="UserModalButton"
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </Box>

        <Box>
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <RocketLaunchIcon />
          </IconButton>
          {currentRequest === "Login" ? (
            <Login handleClose={handleClose} />
          ) : (
            <Signup />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default UserModal;