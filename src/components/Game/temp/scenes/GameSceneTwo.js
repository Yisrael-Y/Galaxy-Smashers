import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('player', 'assets/player_spritesheet.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('enemy', 'assets/enemy_spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('backgroundMusic', 'assets/background_music.mp3');
    this.load.audio('playerJump', 'assets/player_jump.wav');
    // Load other assets and audio files
  }

  create() {
    this.createPlayer();
    this.createEnemies();
    this.createAnimations();
    this.createUI();
    this.playBackgroundMusic();

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.handlePlayerMovement();

    // Spawn enemies
    if (Phaser.Math.RND.chance(0.01)) {
      const x = Phaser.Math.RND.between(0, this.game.config.width);
      const y = Phaser.Math.RND.between(0, this.game.config.height);
      const enemy = this.enemies.get(x, y);
      enemy.setActive(true).setVisible(true);
    }
  }

  createPlayer() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(
      this.player,
      this.enemies,
      this.handleCollision,
      null,
      this
    );
  }

  createEnemies() {
    this.enemies = this.physics.add.group({
      key: 'enemy',
      repeat: 5,
      setXY: { x: 100, y: 100, stepX: 100 },
    });
    this.enemies.children.each((enemy) => {
      this.physics.add.collider(enemy, this.enemies);
    });
  }

  createAnimations() {
    this.anims.create({
      key: 'playerRun',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'enemyIdle',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });
    // Create other animations
  }

  createUI() {
    // Create UI elements such as score display, health bar, etc.
  }

  playBackgroundMusic() {
    this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
    this.backgroundMusic.play();
  }

  handlePlayerMovement() {
    // Player movement
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
      this.sound.play('playerJump');
    }

    // Update player animation
    if (this.player.body.velocity.x !== 0) {
      this.player.anims.play('playerRun', true);
    } else {
      this.player.anims.stop();
      this.player.setTexture('player', 0);
    }
  }

  handleCollision(player, enemy) {
    // Handlecollision between player and enemy:
    player.disableBody(true, true);
    enemy.disableBody(true, true);
    this.sound.stopAll();
    this.backgroundMusic.stop();
    this.scene.start('GameOverScene');
  }
}

export default GameScene;
