class Shape {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.stroke = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    this.vx = undefined;
    this.vy = undefined;
    this.opacity = undefined;
    this.strokeWeight = undefined;
    this.strokeWeightGrowth = undefined;
    this.growSize = undefined;
    this.colorChange = undefined;
    this.growing = true;
    this.maxSize = undefined;

    //Synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  grow() {
    let randomValue = random();
    if (this.growing) {
      this.size += this.growSize;
      this.strokeWeight += this.strokeWeightGrowth;
      if (randomValue < 0.33) {
        this.stroke.r += this.colorChange;
        this.fill.r += -this.colorChange;
      } else if (randomValue > 0.66) {
        this.stroke.g += this.colorChange;
        this.fill.g += -this.colorChange;
      } else {
        this.stroke.b += this.colorChange;
        this.fill.b += -this.colorChange;
      }
    }

    if (this.size < -this.maxSize || this.size > height + this.maxSize) {
      stop();
      this.strokeWeight = 0;
      this.growing = false;
      this.opacity = 0;
    } else {
      this.playNote();
    }
  }

  playNote() {
    this.synth.play(this.note, 0.1, 0, 0.1);
  }

  display() {}
}
