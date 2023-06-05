import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import Player1 from './Player1'

const GameScreen = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!game) {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 }
          }
      },
        scene: [Player1],
        parent: 'game-container'
      };

      setGame(new Phaser.Game(config));
    }

    return () => {
      if (game) {
        game.destroy(); 
      }
    };
  }, [game]);

  return ( <div className='GameContainer'>
              <h1 className='PlayerStats'>Player Stats</h1>
              {{game} && <div style={{textAlign:'center'}} id="game-container"/>}
              <h1 className='PlayerStats'>Player Stats</h1>
          </div>
);
};

export default GameScreen;
