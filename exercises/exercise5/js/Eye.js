class Eye {

  // The constructor() sets up a flower's properties
  constructor(x, y, size, irisColor) {
    //postition for x, y for translate function for shape of eye
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size;
    this.irisThickness = 10;
    this.maxIrisThickness = 10;
    // Color information
    this.eyeFill = 220;
    this.irisColor = irisColor;
    this.centreColor = {
      r: 0,
      g: 0,
      b: 50
    };
    this.alive = true;
  }

shrink() {

  let shrinkage = random(0, 0.1);
  this.size = this.size - shrinkage;
  this.irisThickness = this.irisThickness - shrinkage/20;
  // this.size = constrain(this.size, 30, this.maxSize);

  if (this.size <= 30 ) {
    this.alive = false;
  }
}

grow() {
  if (!this.alive) {
  let growthRate = random(0, 0.1);
  this.size += growthRate;
  this.irisThickness += growthRate/20;
  }

  if (this.size >= this.maxSize || this.irisThickness >= this.maxIrisThickness) {
    this.alive = true;
  }
}

pollinate() {
  let growth = random(0, 0.05);
  this.size += growth;
  this.irisThickness += growth;

  this.size = constrain(this.size, 0, this.maxSize);
  this.irisThickness = constrain(this.irisThickness, 0, this.maxIrisThickness);
}
// display()
  // Displays the flower on the canvas
  display() {
    push();
    // Draw a circle with a heavy outline for the flower

    translate(this.x, this.y);
    beginShape();
    fill(this.eyeFill);
    vertex(-80,0);
    bezierVertex(-30,-50,30,-50,80,0);
    bezierVertex(30,50,-30,50,-80,0)
    endShape();

    strokeWeight(this.irisThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.irisColor.r, this.irisColor.g, this.irisColor.b);
    ellipse(0, 0, this.size);
    pop();
  }

  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size/2 + this.irisThickness) {
      this.irisThickness += - 1;
      this.eyeFill += 1;
      if (this.x < width/2 && this.y < height/2) {
        this.x += -random(0, 10);
        this.y += -random(0, 10);
      } else if (this.x < width/2 && this.y > height/2)  {
        this.x += -random(0, 10);
        this.y += random(0, 10);
      } else if (this.x > width/2 && this.y < height/2) {
        this.x += random(0, 10);
        this.y += -random(0, 10);
      } else if (this.x > width/2 && this.y > height/2) {
        this.x += random(0, 10);
        this.y += random(0, 10);
      }
    }
  }
}
