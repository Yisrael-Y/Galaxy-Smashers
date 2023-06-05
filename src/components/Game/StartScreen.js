class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.audio("music", "src/assets/starter.flac");
  }

  create() {
    this.sound.play("music", { loop: true });
    this.add
      .text(200, 250, "Start Game", { fill: "#fff", fontSize: "64px" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("NicknameScene");
      });
  }
}

export default StartScene;
