import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Modal from './Login/Modal'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token')// this is temp

    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const navigateToHomepage = () => {
        navigate('/');
      };
  return (
    <AppBar className='AppContainer' position="static">
        <Toolbar>
            <SportsTennisIcon/>
            <Typography on variant="h6" className='Header' onClick={navigateToHomepage} >
                Galaxy Smashers
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'flex', md: 'flex' } }}>
                {token ? <Button
                onClick={(e) => handleLogOut(e)}
                sx={{ my: 2, color: 'black', display: 'block'}}
                >
                Log Out
                </Button>
                : 
                <Button
                onClick={() => handleOpen()}
                sx={{ my: 2, color: 'black', display: 'block'}}
                >
                Log in
                </Button> }
            </Box>
        </Toolbar>
        <Modal open={open} handleClose={handleClose} />
    </AppBar>
  )
}

export default NavBar