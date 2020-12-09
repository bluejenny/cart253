class Circle3 extends Shape {
  constructor(x, y, note) {
    super(x, y);
    this.size = 200;
    this.strokeWeight = random(0, 5);
    this.strokeWeightGrowth = .05;
    this.growSize = -1;
    this.colorChange = 1;
    this.opacity = 150;
    this.maxSize = 0;
  }

  display() {
    super.display();

    push();
    strokeWeight(this.strokeWeight);
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, 200);
    fill(this.fill.r, this.fill.g, this.fill.b, this.opacity);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
