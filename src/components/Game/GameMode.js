class GameMode extends Phaser.Scene {
  constructor() {
    super({ key: "GameMode" });
  }

  preload() {
    this.load.video("spaceVideo", "src/assets/space-vid.mp4");
  }

  create() {
    const centerX = this.game.canvas.width / 2;
    const centerY = this.game.canvas.height / 2;
    const textOffset = 60;
    const buttonSpacing = 80;
    const spaceVideo = this.add.video(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "spaceVideo"
    );

    spaceVideo.play(true);
    spaceVideo.setOrigin(0.5);

    this.add
      .text(centerX, centerY - textOffset, "Choose your game mode", {
        fill: "#fff",
        fontFamily: "Lato",
      })
      .setScale(2)
      .setOrigin(0.5);

    this.createButton(
      centerX,
      centerY + buttonSpacing - textOffset,
      "Singleplayer",
      "ModeSelection"
    );
    this.createButton(
      centerX,
      centerY + buttonSpacing * 2 - textOffset,
      "Multiplayer",
      "WaitingRoom"
    );
  }

  createButton(x, y, text, scene) {
    const buttonWidth = 150;
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

    button.on("pointerdown", () => {
      this.scene.start(scene);
    });
  }
}

export default GameMode;
