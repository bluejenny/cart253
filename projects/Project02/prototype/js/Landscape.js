class Landscape {
  constructor() {
    this.bckgrnd = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    this.mtn = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    this.land = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    this.opacity = 200;
  }

  backgroundFade() {
    let fade = map(mouseY, 0, height, 235, 0);
    fill(this.bckgrnd.r, this.bckgrnd.g, this.bckgrnd.b, fade);
    rect(0, 0, width, height); //light sky
  }

  display() {

    push();

    // mts back
    fill(this.mtn.r, this.mtn.g, this.mtn.b);
    stroke(200);
    triangle(
      mouseX - width / 10,
      (2 * height) / 3,
      0,
      height / 3,
      0,
      height);
    triangle(
      mouseX + width / 10,
      (2 * height) / 3,
      width,
      height / 3,
      width,
      height
    );

    // mtns front
    triangle(
      mouseX - width / 80,
      (2 * height) / 3,
      0,
      height / 5,
      0,
      height);
    triangle(
      mouseX + width / 10,
      (2 * height) / 3,
      width,
      height / 3,
      width,
      height
    );

    //land
    fill(this.land.r, this.land.g, this.land.b, 200);
    rect(0, (2 * height) / 3, width, height / 2);
    pop();

  }
}
