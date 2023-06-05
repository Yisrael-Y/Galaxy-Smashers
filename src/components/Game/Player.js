class Player extends Phaser.Scene {
  constructor() {
    super();
    this.cursors = null;
    this.speed = 300;
    this.player1 = null;
    this.player2 = null;
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("paddle", "assets/sprites/paddle.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    this.player1 = this.createPlayer(50, 300);
    this.player2 = this.createPlayer(750, 300);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer(x, y) {
    const player = this.physics.add.sprite(x, y, "paddle");
    player.setImmovable(true);
    player.setScale(1);
    player.setCollideWorldBounds(true);
    return player;
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player1.setVelocityY(-this.speed);
      this.player2.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.player1.setVelocityY(this.speed);
      this.player2.setVelocityY(this.speed);
    } else {
      this.player1.setVelocityY(0);
      this.player2.setVelocityY(0);
    }
  }
}

export default Player;
