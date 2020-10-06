/**************************************************
05 - Functions

**************************************************/

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circle.y = height/2;

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  move();
  wrap();
  display();
}

function display() {
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, circle.size);
}


function wrap() {
  if (circle.x > width) {
    reset();
  }
}

function move() {
  circle.x += circle.vx;
  circle.y += circle.vy;
}

function reset() {
  circle.x = 0;
  circle.vx += 2;
  circle.vy += -0.1;
  circle.size += 5;
}

function mousePressed() {
  reset();
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
