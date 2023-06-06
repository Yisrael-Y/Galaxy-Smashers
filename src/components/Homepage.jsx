import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import Modal from "./Login/Modal"
import { useNavigate } from 'react-router-dom';
import "../componentstyles/homepage.css"

const Homepage = () => {

    //  const navigate = useNavigate();
     const [open, setOpen] = useState(true);


    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className="main-pg">
      <div className="top-section"></div>
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main"> Galaxy Smashers </span>
          {/* <span className="heading-primary-sub"> Brought to you by  </span> */}
          <span className="heading-primary-text">
            Prepare for an interstellar battle like no other!
          </span>
        </h1>
        <div className="btn btn-animated" onClick={handleClick}>
          Start Your Adventure
        </div>
      </div>
      <Modal open={open} handleClose={handleClose} />
    </div>
  );
}

export default Homepage
