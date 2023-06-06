import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // Create menu text
    const titleLabel = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 4,
      'Game Title',
      {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff',
      }
    );
    titleLabel.setOrigin(0.5);

    const singlePlayerLabel = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'Single Player',
      {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
      }
    );
    singlePlayerLabel.setOrigin(0.5);
    singlePlayerLabel.setInteractive();
    singlePlayerLabel.on('pointerup', () => {
      this.scene.start('GameScene', { mode: 'single' });
    });

    const multiplayerLabel = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2 + 50,
      'Multiplayer',
      {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
      }
    );
    multiplayerLabel.setOrigin(0.5);
    multiplayerLabel.setInteractive();
    multiplayerLabel.on('pointerup', () => {
      this.scene.start('GameScene', { mode: 'multi' });
    });
  }
}

export default MenuScene;
