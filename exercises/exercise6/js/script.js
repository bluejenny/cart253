"use strict";

/**************************************************
Exercise 6: Make Some Noise
Jen Poohachoff
**************************************************/

//darker background behind animation to make it appear as if getting darker
let bgDark = {
  r: 48,
  g: 65,
  b: 79,
};

//sky bacground, opacity fades as mouseY moves down
let bgLight = {
  r: 202,
  g: 225,
  b: 244,
};

// the circles
let circles = [];

// F-minor
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // userStartAudio();
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  // 2nd background that decreases opacity
  // as mouseY moves towards height
  backgroundFade();

  // show + where user can click
  displayMarkers();

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.grow();
    circle.display();
  }
}

// creates effect of canvas getting lighter or darker
// based on mouseY position, 0 = light, height = dark

function backgroundFade() {
  let m = map(mouseY, 0, height, 235, 0);
  fill(bgLight.r, bgLight.g, bgLight.b, m);
  rect(0, 0, width, height); //light sky
}

function displayMarkers() {
  //displays a graph of + markers to show user where to click
  push();
  let m = map(mouseY, 0, height, 235, 0);
  strokeWeight(5);
  stroke(47, m);

  // example of points where sound will play --> top line
  line(width / 2 - 5, height / 2 - 200, width / 2 + 5, height / 2 - 200);
  line(width / 2, height / 2 - 205, width / 2, height / 2 - 195);

  line(width / 6 - 5, height / 2 - 200, width / 6 + 5, height / 2 - 200);
  line(width / 6, height / 2 - 205, width / 6, height / 2 - 195);

  line(
    (width / 6) * 5 - 5,
    height / 2 - 200,
    (width / 6) * 5 + 5,
    height / 2 - 200
  );
  line((width / 6) * 5, height / 2 - 205, (width / 6) * 5, height / 2 - 195);

  // example of points where sound will play --> center line
  line(width / 2 - 5, height / 2, width / 2 + 5, height / 2);
  line(width / 2, height / 2 - 5, width / 2, height / 2 + 5);

  line(width / 6 - 5, height / 2, width / 6 + 5, height / 2);
  line(width / 6, height / 2 - 5, width / 6, height / 2 + 5);

  line((width / 6) * 5 - 5, height / 2, (width / 6) * 5 + 5, height / 2);
  line((width / 6) * 5, height / 2 - 5, (width / 6) * 5, height / 2 + 5);

  // example of points where sound will play --> bottom line
  line(width / 2 - 5, height / 2 + 200, width / 2 + 5, height / 2 + 200);
  line(width / 2, height / 2 + 205, width / 2, height / 2 + 195);

  line(width / 6 - 5, height / 2 + 200, width / 6 + 5, height / 2 + 200);
  line(width / 6, height / 2 + 205, width / 6, height / 2 + 195);

  line(
    (width / 6) * 5 - 5,
    height / 2 + 200,
    (width / 6) * 5 + 5,
    height / 2 + 200
  );
  line((width / 6) * 5, height / 2 + 205, (width / 6) * 5, height / 2 + 195);
  pop();
}
function mousePressed() {
  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
  }

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
  }

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
  }
}

function createCircle(x, y) {
  let note = random(notes);
  let circle = new Circle(x, y, note);
  circles.push(circle);
}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
