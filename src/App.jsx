import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import React from 'react';
import { Typography } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar';
import GameScreen from './components/Game/GameScreen';
import Chat from './components/Chat/Chat';
import SocketProvider from './components/Chat/SocketConnect';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gamescreen" element={<GameScreen />} />
      </Routes>
      <SocketProvider>
        <Chat />
      </SocketProvider>
      <footer className="Footer">
        <Typography variant="h6">© 2023 Galaxy Smashers</Typography>
      </footer>
    </div>
  );
}

export default App;
