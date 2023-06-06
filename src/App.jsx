import React from "react";
import { Typography } from "@mui/material";
import "./App.css";
import NavBar from "./components/NavBar";
import GameScreen from "./components/Game/GameScreen";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gamescreen" element={<GameScreen />} />
      </Routes>
      <footer className="Footer">
        <Typography variant="h6">© 2023 Galaxy Smashers</Typography>
      </footer>
    </div>
  );
}

export default App;
