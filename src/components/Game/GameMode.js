class GameMode extends Phaser.Scene {
  constructor() {
    super({ key: "GameMode" });
  }

  create() {
    this.add
      .text(310, 120, "Choose your game mode", {
        fill: "#fff",
        fontFamily: "Lato",
      })
      .setScale(2)
      .setOrigin(0.2);

    this.createButton(310, 200, "Singleplayer", "Game");
    this.createButton(310, 260, "Multiplayer", "Test");
  }

  createButton(x, y, text, scene) {
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
      this.scene.start(scene);
    });
  }
}

export default GameMode;
