import React from 'react';

const Player = ({ id, position }) => {
  return (
    <div 
      id={id}
      className='player'
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
    </div>
  )
}

export default Player;
