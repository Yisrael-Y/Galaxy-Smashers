class Player extends Phaser.Scene {
  constructor() {
    super({ key: "Player" });
    this.cursors = null;
    this.speed = 300;
    this.player1 = null;
    this.player2 = null;
  }

  preload() {
    this.load.audio("rocky", "src/assets/rocky.mp3");
    this.load.image("sky", "src/assets/space-bag.jpg");
    this.load.image("paddle", "assets/sprites/paddle.png");
  }

  create() {
    const { width, height } = this.game.canvas;

    this.add.image(width / 2, height / 2, "sky").setDisplaySize(width, height);
    this.sound.play("rocky", { loop: true });
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
