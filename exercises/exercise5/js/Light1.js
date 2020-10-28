class Light1 {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.maxSize = 500;
    this.minSize = 100;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.growRate = .3; // How much larger we get each frame
    this.jitteriness = 0.25; // How likely the Light is to change direction
    this.on = true; // The Light starts out on!
  }

  // grow() causes the Light to get larger over time
  grow() {
    // grow by reducing the size by a set amount
    this.size = this.size + this.growRate;
    // Check if we're larger than the max size
    if (this.size > this.maxSize) {
      // If so, we're done for the night
      this.on = false
    }
  }

  // shrink() {
  //   // grow by reducing the size by a set amount
  //   this.size = this.size + this.growRate;
  //   // Check if we're larger than the max size
  //   if (this.size > width) {
  //     // If so, we're done for the night
  //     noLoop();
  //   }
  // }

  // tryToPollinate(flower) {
  //   let d = dist(this.x, this.y, flower.x, flower.y);
  //   if (d < this.size/2 + flower.size/2 + flower.petalThickness) {
  //     this.grow();
  //     flower.pollinate();
  //   }
  // }

  // grow() {
  //   this.size = this.size + this.growRate;
  //   this.size = constrain(this.size, this.minSize, this.maxSize);
  // }

  // move() moves the Light by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our Light onto the canvas
  display() {

    push();
    fill(225, 225, 100, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

  }
}
