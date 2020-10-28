class Flower {

  // The constructor() sets up a flower's properties
  constructor(x, y, size, petalColor) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size;
    this.petalThickness = 10;
    this.maxPetalThickness = 10
    // Color information
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
    this.alive = true;
  }

shrink() {
  let shrinkage = random(0, 0.1);
  this.size = this.size - shrinkage;
  this.petalThickness = this.petalThickness - shrinkage/10;

  if (this.size <= 0 || this.petalThickness <= 0) {
    this.alive = false;
  }
}

pollinate() {
  let growth = random(0, 0.05);
  this.size += growth;
  this.petalThickness += growth;

  this.size = constrain(this.size, 0, this.maxSize);
  this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
}
// display()
  // Displays the flower on the canvas
  display() {
    push();
    // Draw a circle with a heavy outline for the flower

    translate(this.x, this.y);
    beginShape();
    vertex(-80,0);
    bezierVertex(-30,-50,30,-50,80,0);
    bezierVertex(30,50,-30,50,-80,0)
    endShape();

    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(0, 0, this.size);
    pop();
  }

  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size/2 + this.petalThickness) {
      this.y += - 5;
    }
  }
}
