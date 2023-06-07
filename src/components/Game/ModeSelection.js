class ModeSelection extends Phaser.Scene {
  constructor() {
    super("ModeSelection");
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
      .text(centerX, centerY - textOffset, "Mode Selection", {
        fill: "#fff",
        fontFamily: "Lato",
      })
      .setScale(2)
      .setOrigin(0.5, 0.5);

    this.createButton(
      centerX,
      centerY + buttonSpacing - textOffset,
      "Easy",
      "Game",
      {
        speed: 800,
        predictionFactor: 0.5,
      }
    );
    this.createButton(
      centerX,
      centerY + buttonSpacing * 2 - textOffset,
      "Medium",
      "Game",
      {
        speed: 600,
        predictionFactor: 0.15,
      }
    );
    this.createButton(
      centerX,
      centerY + buttonSpacing * 3 - textOffset,
      "Hard",
      "Game",
      {
        speed: 400,
        predictionFactor: 0.05,
      }
    );
  }

  createButton(x, y, text, scene, data) {
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
      this.sound.stopByKey("music");
      this.scene.start(scene, data);
    });
  }
}

export default ModeSelection;
