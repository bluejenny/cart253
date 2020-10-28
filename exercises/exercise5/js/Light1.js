class Light1 {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.minSize = 10; // If we get smaller than this minimum we're dead
    this.maxSize = 1000;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.growRate = .5; // How much larger we get each frame
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
      this.on = false;
    }
  }

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

    // Body
    push();
    fill(225, 225, 100, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();

    // Eyes
    push();
    // fill(0, 0, 0);
    // noStroke();
    // ellipse(this.x - this.size / 10, this.y, this.size / 10);
    // ellipse(this.x + this.size / 10, this.y, this.size / 10);
    pop();
  }

  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size/2) {
      this.on = false;
    }
  }
}
