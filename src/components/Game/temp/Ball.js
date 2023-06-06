import Phaser from 'phaser';

class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(1);
  }

  launch() {
    const speedX = Phaser.Math.Between(-200, 200);
    const speedY = Phaser.Math.Between(-200, -100);
    this.setVelocity(speedX, speedY);
  }

  reset() {
    this.setVelocity(0, 0);
    this.setX(this.scene.game.config.width / 2);
    this.setY(this.scene.game.config.height / 2);
  }
}

export default Ball;

/* In this example, we create a Ball class that extends Phaser.Physics.Arcade.Sprite. The constructor takes the scene, initial x and y coordinates as parameters.

Inside the constructor, we call the parent class constructor and add the ball sprite to the scene. We also add physics to the ball using scene.physics.add.existing(this). The ball is set to collide with the world bounds and is given a bounce value of 1 to create a classic bouncing effect.

The launch method is responsible for giving the ball an initial velocity when it is launched. It randomly sets the horizontal (speedX) and vertical (speedY) velocities within a specified range.

The reset method resets the ball's velocity and positions it at the center of the game screen. This can be useful when restarting the game or when the ball goes out of bounds.

With the Ball class, you can create a ball object in your GameScene and interact with it as needed. For example, you can launch the ball when the game starts or when a specific event occurs, and reset it when it goes out of bounds or when the game is reset.

Make sure to adjust the asset key and any other properties or methods based on your own game's requirements. */
