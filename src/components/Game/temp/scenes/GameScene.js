import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    // Add your asset loading code specific to this scene
    this.load.image('background', 'assets/background.png');
  }

  create() {
    /* Add your initialization code specific to this scene */

    //   Add your initialization code specific to this scene
    this.add.image(400, 300, 'background');

    // Create a player sprite
    this.player = this.add.sprite(400, 300, 'player');

    this.physics.add.existing(this.player);

    // Create enemies group
    this.enemies = this.physics.add.group();

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up mouse input
    this.input.on('pointerdown', this.handlePointerDown, this);

    // Set up collisions
    this.physics.add.collider(
      this.player,
      this.enemies,
      this.handleCollision,
      null,
      this
    );
  }

  update() {
    // Add your game logic code specific to this scene

    // Player movement
    if (this.cursors.up.isDown) {
      this.player.y -= 5;
    } else if (this.cursors.down.isDown) {
      this.player.y += 5;
    }

    if (this.cursors.left.isDown) {
      this.player.x -= 5;
    } else if (this.cursors.right.isDown) {
      this.player.x += 5;
    }

    // Spawn enemies
    if (Phaser.Math.RND.chance(0.01)) {
      const x = Phaser.Math.RND.between(0, this.game.config.width);
      const y = Phaser.Math.RND.between(0, this.game.config.height);
      const enemy = this.add.sprite(x, y, 'enemy');
      this.physics.add.existing(enemy);
      this.enemies.add(enemy);
    }
  }

  handlePointerDown(pointer) {
    // Handle mouse click or touch
    console.log('Mouse or touch down at:', pointer.x, pointer.y);
  }

  handleCollision(player, enemy) {
    // Handle collision between player and enemy
    player.disableBody(true, true);
    enemy.disableBody(true, true);
    console.log('Player collided with an enemy!');
  }
}

export default GameScene;
