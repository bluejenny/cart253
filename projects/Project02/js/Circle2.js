class Circle2 extends Shape {
  constructor(x, y, note) {
    super(x, y);
    this.size = 0;
    this.strokeWeight = 0;
    this.strokeWeightGrowth = 0;
    this.growSize = 6;
    this.colorChange = 2;
    this.opacity = 100;
    this.maxSize = 1000;
  }

  display() {
    super.display();

    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, this.opacity);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
