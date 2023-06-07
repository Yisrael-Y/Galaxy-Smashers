import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    // Set up animations
    scene.anims.create({
      key: 'playerRun',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(cursors) {
    // Player movement
    this.setVelocity(0);
    if (cursors.left.isDown) {
      this.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      this.setVelocityX(200);
    }
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-400);
    }

    // Update player animation
    if (this.body.velocity.x !== 0) {
      this.anims.play('playerRun', true);
    } else {
      this.anims.stop();
      this.setTexture('player', 0);
    }
  }
}

export default Player;
