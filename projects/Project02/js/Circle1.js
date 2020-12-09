class Circle1 extends Shape {
  constructor(x, y, note) {
    super(x, y);
    this.size = 0;
    this.strokeWeight = 1;
    this.strokeWeightGrowth = 0.025;
    this.growSize = 10;
    this.colorChange = 5;
    this.opacity = 255;
    this.maxSize = 500;
  }

  display() {
    super.display();

    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, 200);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
