import Phaser from "phaser";

class NicknameScene extends Phaser.Scene {
  constructor() {
    super({ key: "NicknameScene" });
  }

  create() {
    this.add.text(310, 120, "Enter your nickname", { fill: "#fff" });
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.style.position = "absolute";
    inputElement.style.top = "30%";
    inputElement.style.left = "50%";
    inputElement.style.transform = "translate(-50%, -50%)";
    inputElement.style.width = "200px";
    inputElement.style.height = "40px";

    this.game.canvas.parentElement.appendChild(inputElement);

    inputElement.addEventListener("input", (event) => {
      const text = event.target.value;
    });

    let doneButton = this.add
      .text(360, 200, "Done", {
        fill: "#000",
        backgroundColor: "#0f3",
        fontSize: "2rem",
        paddingLeft: "30",
        paddingRight: "30",
        paddingTop: "20",
        paddingBottom: "20",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.stopByKey("music");
        inputElement.remove();
        this.scene.start("Game", { nickname: inputElement.value });
      });
  }
}

export default NicknameScene;
