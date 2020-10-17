/**************************************************
Exercise 3: Love Actually
JPoohachoff
**************************************************/

let circle = {
  x: 0,
  y: 0,
  fill: 124,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  maxSpeed: 5,
}

let circle2 = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  speed: 10,
  acceleration: 5,
  tx: 0, // A "time" value for the horizontal (for noise())
  ty: 10 // A "time" value for the vertical (for noise())
}

let state = `simulation`; // can be simulation or escape

//set up to draw heart
const R = 75;
const xh = angle => R / 15.0 * 16 * Math.pow(Math.sin(angle), 3);
const yh = p => R / 15.0 * (-13 * Math.cos(p) + 5 * Math.cos(2 * p) + 2 * Math.cos(3 * p) + Math.cos(4 * p));


function setup() {
  createCanvas(windowWidth, windowHeight);
  circle2.x = random(0, width);
  circle2.y = random(0, height);
}


function draw() {

  if (state === `simulation`) {
    simulation();
  }
  else if (state === `escape`) {
    escape();
  }

  //
  secretText();
}

function secretText() {
  push();
  noStroke();
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text(`press [escape] to exit`, width-60, 60);
  pop();
}

function simulation() {
  // movement of circle around cursor
  if (mouseX < circle.x) {
    circle.ax = -circle.acceleration;
  }
  else {
    circle.ax = circle.acceleration;
  }

  if (mouseY < circle.y) {
    circle.ay = -circle.acceleration;
  }
  else {
    circle.ay = circle.acceleration;
  }

  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed)
  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed)

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);


  // movement circle2
  if (mouseX < circle2.x) {
    circle2.ax = -circle2.acceleration;
  }
  else {
    circle2.ax = circle2.acceleration;
  }
  if (mouseY < circle2.y) {
    circle2.ay = -circle2.acceleration;
  }
  else {
    circle2.ay = circle2.acceleration;
  }

  //to create noise
  circle2.tx = circle2.tx + 0.025;
  circle2.ty = circle2.ty + 0.025;

  let noiseX = noise(circle2.tx);
  let noiseY = noise(circle2.ty);

  circle2.vx = map(noiseX, 0, 1, -circle2.speed, circle2.speed);
  circle2.vy = map(noiseY, 0, 1, -circle2.speed, circle2.speed);

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;

  push();
  // fill(255, 255, 0);
  ellipse(circle2.x, circle2.y, circle2.size);
  pop();

  // check to see if circles go off the page
  if (circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
    circle2.x = random(0, width);
    circle2.y = random(0, height);
  }

  checkOverlap();
}

function checkOverlap() {
  // check to see if the circles overlap
  let d = dist(circle.x, circle.y, circle2.x, circle2.y);
  if (d < circle.size/2 + circle2.size/2) {
    // rectMode(CENTER, CENTER);
    // rect(width/2, height/2, 100, 100);
    drawHeart();
  }
}

 function drawHeart() {
   push();
   stroke(0);
   fill(`red`);
   strokeWeight(2);
   beginShape();
   let n = 200;
   for (let i = 0; i < n; i++) {
   let x = width / 2 + xh(TAU * i / n);
   let y = height / 2 + yh(TAU * i / n);
   vertex(x, y);
 }
 endShape();
 pop();
 }

 function escape() {
   background(255);
   fill(0);
   textSize(24);
   textAlign(CENTER);
   text('you have escaped love, for now...', width/2, height/2 - 20);
 }

function keyPressed() {
  if (keyCode === ESCAPE && state === `simulation`) {
    state = `escape`;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
