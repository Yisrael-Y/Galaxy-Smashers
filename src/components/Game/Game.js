class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.players = [];
    this.speed = 600;
    this.score = [0, 0];
    this.isGameInProgress = false;
  }

  preload() {
    this.load.audio("rocky", "src/assets/rocky.mp3");
    this.load.image("sky", "src/assets/space-bag.jpg");
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.image(width / 2, height / 2, "sky").setDisplaySize(width, height);
    this.sound.play("rocky", { loop: true });

    const cursorsKeys = this.input.keyboard.createCursorKeys();
    this.players.push(this.createPlayer(50, height / 2, cursorsKeys));

    const wasdKeys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.players.push(this.createPlayer(width - 50, height / 2, wasdKeys));

    const circle = this.add.circle(width / 2, height / 2, 15, 0xffffff);
    this.ball = this.physics.add.existing(circle, false);
    this.ball.body.setCircle(15);
    this.ball.body.setBounce(1);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setVelocity(
      Phaser.Math.Between(-400, 400),
      Phaser.Math.Between(-400, 400)
    );

    this.players.forEach((player) => {
      this.physics.add.collider(player, this.ball);
    });

    // Add score text to the game
    this.scoreText = this.add.text(width / 2, 50, "0 | 0", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.scoreText.setOrigin(0.5);
  }

  createPlayer(x, y, keys) {
    const player = this.add.rectangle(x, y, 20, 100, 0xffffff);
    this.physics.world.enable(player);
    player.body.setImmovable(true);
    player.body.setCollideWorldBounds(true);
    player.controls = keys;
    return player;
  }

  updateScore(playerIndex) {
    this.score[playerIndex]++;
    this.scoreText.setText(`${this.score[0]} | ${this.score[1]}`);
  }

  startGame() {
    const { width, height } = this.game.canvas;
    let timer = 3;
    const title = this.add.text(
      width / 2,
      height / 2,
      `Game Starting in ${timer}`
    );
    title.setScale(2);
    this.ball.setVisible(false);

    const countdown = setInterval(() => {
      timer -= 1;
      title.text = `Game Starting in ${timer}`;

      if (timer === 0) {
        clearInterval(countdown);
        title.destroy();
        this.ball.setVisible(true);
        this.ball.setPosition(width / 2, height / 2);
      }
    }, 1000);
  }

  update() {
    this.players.forEach((player, index) => {
      if (player.controls.up.isDown) {
        player.body.setVelocityY(-this.speed);
      } else if (player.controls.down.isDown) {
        player.body.setVelocityY(this.speed);
      } else {
        player.body.setVelocityY(0);
      }
    });

    const width = this.game.canvas.width;
    if (this.ball.x - 15 === 0) {
      this.updateScore(1);
      this.startGame();
    } else if (this.ball.x + 15 === width) {
      this.updateScore(0);
      this.startGame();
    }
  }
}

export default Game;
