import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { Box } from '@material-ui/core';
import GameScene from './scenes/GameScene';
import MenuScene from './MenuScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
    },
  },
};

function Game() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    function preload() {
      // Add your asset loading code here
    }

    function create() {
      // Add your initialization code here
    }

    function update() {
      // Add your game logic code here
    }

    return () => {
      game.destroy();
    };
  }, []);

  return <Box id="game-container" />;
}

export default Game;
