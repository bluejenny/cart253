class Circle {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.stroke = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    this.strokeWeight = 1;
    this.strokeWeightGrowth = 0.025;
    this.growSize = 10;
    this.colorChange = 5;
    this.growing = true;

    //Synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  grow() {
    if (this.growing) {
      this.size += this.growSize;
      this.strokeWeight += this.strokeWeightGrowth;
      this.stroke.r += this.colorChange;
      this.stroke.g += this.colorChange;
      this.stroke.b += this.colorChange;
    }

    if (this.size < -500 || this.size > height+500) {
      stop();
      this.strokeWeight = 0;
      this.growing = false;
    } else {
      this.playNote();
    }
  }

  playNote() {
    this.synth.play(this.note, 0.1, 0, 0.1);
  }

  display() {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, 200);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
