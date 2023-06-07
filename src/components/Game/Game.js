class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.players = [];
    this.speed = 600;
    this.score = [0, 0];
    this.gameStarted = false;
    this.gameReset = false;
    this.ballSpeedX = 300;
    this.ballSpeedY = 300;
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
    this.players.push(
      this.createPlayer(50, height / 2, cursorsKeys, { x: 50, y: height / 2 })
    );

    this.players.push(
      this.createPlayer(width - 50, height / 2, null, {
        x: width - 50,
        y: height / 2,
      })
    );

    const circle = this.add.circle(width / 2, height / 2, 15, 0xffffff);
    this.ball = this.physics.add.existing(circle, false);
    this.ball.body.setCircle(15);
    this.ball.body.setBounce(1);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setVelocity(this.ballSpeedX, this.ballSpeedY);

    this.players.forEach((player) => {
      this.physics.add.collider(player, this.ball);
    });

    this.scoreText = this.add.text(width / 2, 50, "0 | 0", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.scoreText.setOrigin(0.5);
    this.startGame();
  }

  createPlayer(x, y, keys, startPosition) {
    const player = this.add.rectangle(x, y, 20, 100, 0xffffff);
    this.physics.world.enable(player);
    player.body.setImmovable(true);
    player.body.setCollideWorldBounds(true);
    player.controls = keys;
    player.startPosition = startPosition;
    return player;
  }

  resetPlayerPositions() {
    this.players.forEach((player) => {
      player.x = player.startPosition.x;
      player.y = player.startPosition.y;
      player.body.setVelocity(0);
    });
  }

  updateScore(playerIndex) {
    this.score[playerIndex]++;
    this.scoreText.setText(`${this.score[0]} | ${this.score[1]}`);
  }

  startGame() {
    this.gameReset = true;
    const { width, height } = this.game.canvas;
    let timer = 2;
    const title = this.add.text(
      width / 2,
      height / 2 - 50,
      `Game Starting in ${timer}`
    );
    title.setOrigin(0.5);
    title.setScale(2);
    this.ball.body.setVelocity(0, 0);
    this.ball.setPosition(width / 2, height / 2);
    const countdown = setInterval(() => {
      timer -= 1;
      title.text = `Game Starting in ${timer}`;
      if (timer === 0) {
        clearInterval(countdown);
        this.ball.body.setVelocity(this.ballSpeedX, this.ballSpeedY);
        title.destroy();
        this.gameStarted = true;
        this.gameReset = false;
      }
    }, 1000);
  }

  update() {
    if (this.gameReset) {
      return;
    }
    this.players.forEach((player, index) => {
      if (this.gameStarted) {
        //AI movements
        if (!player.controls) {
          let predictionFactor = 0.1; // This value can be tweaked
          let futureBallY =
            this.ball.y + this.ball.body.velocity.y * predictionFactor;
          if (futureBallY < player.y && player.body.velocity.y > -this.speed) {
            player.body.setVelocityY(player.body.velocity.y - this.speed * 0.1); // Easing factor applied
          } else if (
            futureBallY > player.y &&
            player.body.velocity.y < this.speed
          ) {
            player.body.setVelocityY(player.body.velocity.y + this.speed * 0.1); // Easing factor applied
          }
        } else {
          //Player movements
          if (player.controls.up.isDown) {
            player.body.setVelocityY(-this.speed);
          } else if (player.controls.down.isDown) {
            player.body.setVelocityY(this.speed);
          } else {
            player.body.setVelocityY(0);
          }
        }
      }
    });

    const width = this.game.canvas.width;
    if (this.ball.x - 15 <= 0) {
      this.updateScore(1);
      this.resetPlayerPositions();
      this.startGame();
    } else if (this.ball.x + 15 >= width) {
      this.updateScore(0);
      this.resetPlayerPositions();
      this.startGame();
    }
  }
}

export default Game;
