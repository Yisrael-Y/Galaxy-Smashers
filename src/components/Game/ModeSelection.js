class ModeSelection extends Phaser.Scene {
  constructor() {
    super("ModeSelection");
  }

  create() {
    this.add
      .text(310, 120, "Mode Selection", {
        fill: "#fff",
        fontFamily: "Lato",
      })
      .setScale(2)
      .setOrigin(0.2);
    this.createButton(310, 200, "Easy", "Game", {
      speed: 800,
      predictionFactor: 0.7,
    });
    this.createButton(310, 260, "Medium", "Game", {
      speed: 600,
      predictionFactor: 0.3,
    });
    this.createButton(310, 320, "Hard", "Game", {
      speed: 400,
      predictionFactor: 0.1,
    });
  }

  createButton(x, y, text, scene, data) {
    const buttonWidth = 150;
    const buttonHeight = 50;
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.fillRoundedRect(x, y, buttonWidth, buttonHeight, 10);
    graphics.strokeRoundedRect(x, y, buttonWidth, buttonHeight, 10);

    const buttonText = this.add.text(
      x + buttonWidth / 2,
      y + buttonHeight / 2,
      text,
      {
        fontSize: "20px",
        fill: "#000",
        align: "center",
        fontFamily: "Lato",
      }
    );

    buttonText.setOrigin(0.5, 0.5);

    const button = this.add.zone(
      x + buttonWidth / 2,
      y + buttonHeight / 2,
      buttonWidth,
      buttonHeight
    );
    button.setInteractive();

    button.on("pointerdown", () => {
      this.sound.stopByKey("music");
      this.scene.start(scene, data);
    });
  }
}

export default ModeSelection;
