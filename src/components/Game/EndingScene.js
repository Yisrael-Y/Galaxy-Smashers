class EndingScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndingScene" });
  }

  init(data) {
    this.winner = data.winner;
  }

  create() {
    const { width, height } = this.game.canvas;
    this.add
      .text(width / 2, height / 2, `${this.winner} Wins!`, {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5);
  }
}

export default EndingScene;
