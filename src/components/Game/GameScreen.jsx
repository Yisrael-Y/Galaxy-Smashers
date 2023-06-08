import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { SocketProvider, Chat } from '../Chat';
import StartScene from './StartScreen';
import GameMode from './GameMode';
import Game from './Game';
import ModeSelection from './ModeSelection';
import EndingScene from './EndingScene';
import WaitingRoom from './WaitingRoom';

const GameScreen = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!game) {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth * 0.75,
        height: 700,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
          },
        },
        scene: [StartScene, GameMode, ModeSelection, WaitingRoom, Game, EndingScene],
        parent: 'game-container',
      };

      setGame(new Phaser.Game(config));
    }

    return () => {
      if (game) {
        game.destroy();
      }
    };
  }, [game]);

  return (
    <>
      <SocketProvider>
      <div className="GameContainer">
        <div className='GameScreen' style={{padding:15, backgroundColor:'#fff2f2'}}>
        {{ game } && (
            <div style={{ width: '70vw' }} id="game-container" />
          )}
        </div>
          <div style={{backgroundColor:'#fff2f2' ,flex:1, display:'flex'}}>
            <Chat/>
          </div>
        </div>
    </SocketProvider>
    </>
  );
};

export default GameScreen;
