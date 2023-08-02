import React, { useContext } from 'react';
import { authContext } from '../../context/authContext';
import "../../componentstyles/gamescreen.css"

const PlayerStats = () => {

    const {userDetails} = useContext(authContext);
  return (
    <div className="PlayerStats">
      <h2>Player Stats</h2>
      <div className="PlayerStats__details">
        <div className="PlayerStats__detail">
          <span className="PlayerStats__label">Name:</span>
          <span className="PlayerStats__value">{userDetails ? userDetails.firstName : ''}</span>
        </div>
        <div className="PlayerStats__detail">
          <span className="PlayerStats__label">Level:</span>
          <span className="PlayerStats__value">10</span>
        </div>
        <div className="PlayerStats__detail">
          <span className="PlayerStats__label">Score:</span>
          <span className="PlayerStats__value">5000</span>
        </div>
        {/* Add more player stats details as needed */}
      </div>
    </div>
  );
};

export default PlayerStats;
