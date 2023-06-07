import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';
import GameScreen from './components/Game/GameScreen';
import Footer from './components/Footer';
import './App.css';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gamescreen" element={<GameScreen />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
