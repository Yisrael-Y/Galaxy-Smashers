class Ball extends Phaser.Scene {
  constructor() {
    super({ key: "Ball" });
    this.ball = null;
  }

  create() {
    const circle = this.add.circle(400, 300, 15, 0xffffff); // Creates a white circle with a radius of 15 at position (400, 300)
    this.ball = this.physics.add.existing(circle); // Adds physics to the circle
    this.ball.body.setCircle(15); // Makes the physics body a circle to match the graphics
    this.ball.setBounce(1); // Makes the ball bounce off the walls
    this.ball.setCollideWorldBounds(true); // Makes the ball not pass the world bounds
    this.ball.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    ); // Sets the ball's initial velocity to a random direction
  }

  update() {}
}

export default Ball;
