import {
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import newAxios from '../Axios';
import { authContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleClose }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserDetails } = useContext(authContext);

  const navigate = useNavigate();

  const detailsChange = (e) => {
    setUser({ ...user, [e.name]: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    try {
      const response = await newAxios.post("/users/login", user);
      setUserDetails(response.data);
      if (response.data) {
        setMessage("Logged in Successfully");
        handleClose();
        navigate("/gamescreen");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <div className="SignUpContainer">
        <div className="SignUpTop">
          <h1 className="center">
            <span className="SignUpHeadline-black">Welcome Back</span>
            <span className="dot">.</span>
          </h1>
          <h2 className="SignUpHeadline">Please sign in to your account.</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              className="LoginTextInputs"
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => detailsChange(e.target)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              className="LoginTextInputs"
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => detailsChange(e.target)}
              required
              fullWidth
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="LoginButton"
            >
              Log in
            </Button>
            {errorMessage && (
              <Typography className="ErrorMessage">{errorMessage}</Typography>
            )}
            {message && <Typography className="Success">{message}</Typography>}
            {isLoading && (
              <Box className="LoaderContainer">
                <CircularProgress />
              </Box>
            )}
          </Box>
        </form>
      </div>
    </>
  );
};
export default Login;
