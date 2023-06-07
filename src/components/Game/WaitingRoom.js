import io from "socket.io-client";

class WaitingRoom extends Phaser.Scene {
  constructor() {
    super("WaitingRoom");
    this.socket = io("http://localhost:8080");
    this.gameId = null;
  }

  preload() {
    this.load.video("spaceVideo", "src/assets/space-vid.mp4");
  }

  create() {
    this.setupSocketConnection();
    const centerX = this.game.canvas.width / 2;
    const centerY = this.game.canvas.height / 2;
    const textOffset = 60;
    const spaceVideo = this.add.video(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "spaceVideo"
    );

    spaceVideo.play(true);
    spaceVideo.setOrigin(0.5);

    this.add
      .text(centerX, centerY - textOffset, "Waiting for players", {
        fill: "#fff",
        fontFamily: "Lato",
      })
      .setScale(2)
      .setOrigin(0.5, 0.5);

    this.socket.on("game created", (gameId) => {
      console.log(`A game with ID ${gameId} has been created.`);
      this.gameId = gameId;

      const gameButton = this.createButton(
        centerX,
        centerY + textOffset,
        `Game ID: ${gameId}`
      );
      gameButton.on("pointerdown", () => {
        this.socket.emit("start game", gameId);
      });
    });

    this.socket.on("game start", (message) => {
      console.log(message);
      this.scene.start("Game");
    });
  }

  setupSocketConnection() {
    this.socket = io("http://localhost:8080");
    const centerX = this.game.canvas.width / 2;
    const centerY = this.game.canvas.height / 2;
    const textOffset = 60;

    this.socket.on("game created", (gameId) => {
      console.log(`A game with ID ${gameId} has been created.`);
      this.gameId = gameId;

      const gameButton = this.createButton(
        centerX,
        centerY + textOffset,
        `Game ID: ${gameId}`
      );
      gameButton.on("pointerdown", () => {
        this.socket.emit("start game", gameId);
      });
    });

    this.socket.on("game start", (message) => {
      console.log(message);
      this.scene.start("Game");
    });
  }

  createButton(x, y, text) {
    const buttonWidth = 200;
    const buttonHeight = 50;
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.fillRoundedRect(
      x - buttonWidth / 2,
      y - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      10
    );
    graphics.strokeRoundedRect(
      x - buttonWidth / 2,
      y - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      10
    );

    const buttonText = this.add.text(x, y, text, {
      fontSize: "20px",
      fill: "#000",
      align: "center",
      fontFamily: "Lato",
    });

    buttonText.setOrigin(0.5, 0.5);

    const button = this.add.zone(x, y, buttonWidth, buttonHeight);
    button.setInteractive();

    return button;
  }
}

export default WaitingRoom;
