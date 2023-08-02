import Phaser from "phaser";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.audio("music", "src/assets/space.mp3");
    this.load.video("spaceVideo", "src/assets/space-vid.mp4");
  }

  create() {
    this.sound.play("music", { loop: true });
    const spaceVideo = this.add.video(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "spaceVideo"
    );

    spaceVideo.play(true);
    spaceVideo.setOrigin(0.5);

    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Start Game",
        {
          fill: "#fff",
          fontSize: "64px",
          fontFamily: "Lato",
        }
      )
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("GameMode");
      });
  }

  connectToSocket() {}
}

export default StartScene;
