class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("start", "assets/start-screen.png");
  }

  create() {
    this.add.image(400, 300, "start");
    this.input.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}

export default StartScene;
