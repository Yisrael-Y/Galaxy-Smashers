import socket from "../Chat/Socket";
import Phaser from "phaser";

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
    this.predictionFactor = 0.3;
  }

  init(data) {
    if (data) {
      this.speed = data.speed;
      this.predictionFactor = data.predictionFactor;
    }
  }

  preload() {
    this.load.audio("rocky", "src/assets/rocky.mp3");
    this.load.image("sky", "src/assets/space-bag.jpg");
  }

  getDirectionFromKeyCode(keyCode) {
    switch (keyCode) {
      case 38:
        return "up";
      case 40:
        return "down";
      default:
        return null;
    }
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add.image(width / 2, height / 2, "sky").setDisplaySize(width, height);
    this.sound.play("rocky", { loop: true });

    // player name and score boxes
    const boxWidth = 200;
    const boxHeight = 50;
    const padding = 10;

    // boxes
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(padding, padding, boxWidth, boxHeight);
    graphics.fillRect(width - boxWidth - padding, padding, boxWidth, boxHeight);

    this.scoreText = this.add.text(width / 2, 50, "0 | 0", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.scoreText.setOrigin(0.5);

    // adding all the player name here, in the future from currently logged in user
    this.playerNameText1 = this.add.text(
      padding + 10,
      padding + 10,
      "Player 1",
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );
    this.playerNameText2 = this.add.text(
      width - boxWidth - padding + 10,
      padding + 10,
      "Player 2",
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );

    const localPlayerKeys = this.input.keyboard.createCursorKeys();
    // send player movement to server
    this.input.keyboard.on("keydown", (event) => {
      const direction = this.getDirectionFromKeyCode(event.keyCode);
      socket.emit("local-player-movement", direction);
    });

    this.players.push(
      this.createPlayer(50, height / 2, localPlayerKeys, {
        x: 50,
        y: height / 2,
      })
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
    // this.playerNameText1.setText(`Player 1`);
    // this.playerNameText2.setText(`Player 2`);
    if (this.score[playerIndex] === 7) {
      this.scene.start("EndingScene", {
        winner: playerIndex === 0 ? "Player 1" : "Player 2",
      });
    }
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
          let futureBallY =
            this.ball.y + this.ball.body.velocity.y * this.predictionFactor;
          if (futureBallY < player.y && player.body.velocity.y > -this.speed) {
            player.body.setVelocityY(player.body.velocity.y - this.speed * 0.1); // Easing factor applied
          } else if (
            futureBallY > player.y &&
            player.body.velocity.y < this.speed
          ) {
            player.body.setVelocityY(player.body.velocity.y + this.speed * 0.1); // Easing factor applied
          }

          // receive player movement from server
          socket.on("remote-player-movement", (direction) => {
            if (direction === "down") {
              player.body.setVelocityY(this.speed);
            } else if (direction === "up") {
              player.body.setVelocityY(-this.speed);
            }
          });
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
