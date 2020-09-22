/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
// function setup() {
//   createCanvas(500, 500);
//
// }

let bg = 0;
// let circleSize = 200;
// let circleX = 0;
// let circleSpeed = 2;
// let circleY = 250;

let circle = {
  x: 0,
  y: 0,
  size: 200,
  speed: 1,
  fill: 255
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // circleSize = 100;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg);
  // circle.speed = random(-5, 5);
  circle.x += circle.speed;
  circle.x = constrain(circle.x, 0, width);
  //circle.y = random(0, 1000);
  //circle.size = random(10, 100);

  // circle.fill = random(0, 255);
  circle.fill = map(mouseX, 0, width, 0, 255);
  fill(circle.fill);
  ellipse(circle.x, height/2, circle.size);

  // console.log(`circle.x: $(circle.x)`);
  // let randomNumber = random();
  // console.log(randomNumber);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
