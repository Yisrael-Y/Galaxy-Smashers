import React from 'react';
import { Typography } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar';
import GameScreen from './components/Game/GameScreen';

function App() {
  
  return (
    <div>
      <NavBar/>
      <GameScreen/>
      <footer className='Footer'>
        <Typography variant="h6">© 2023 Galaxy Smashers</Typography>
      </footer>
    </div>
  );
}

export default App;
