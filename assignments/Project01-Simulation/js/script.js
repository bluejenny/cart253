/**************************************************
conditionals
**************************************************/
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  fill: 124,
  size: 20,
  speed: 0
}

let circle2 = {
  x: 0,
  y: 250,
  fill: 124
}

let circle3 = {
  x: 0,
  y: 250,
  fill: 124
}

let circle4 = {
  x: 0,
  y: 250,
  fill: 124
}

let circle5 = {
  x: 0,
  y: 250,
  fill: 124
}

let headlights = {
  x: 0,
  y: 250,
  fill: 124,
  size: 100,
  speed: 100
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundShade);
  circle.fill = random(0, 255);
  circle.x = random(0, width);
  circle.y = random(0, height);
  fill(circle.fill);
  // circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size );

  circle2.fill = random(0, 255);
  circle2.x = random(0, width);
  circle2.y = random(0, height);
  fill(circle2.fill);
  //circle2.x = circle2.x + circle.speed;
  ellipse(circle2.x, circle2.y, circle.size );

  circle3.fill = random(0, 255);
  circle3.x = random(0, width);
  circle3.y = random(0, height);
  circle3.size = random(0, 35);
  fill(circle2.fill);
  //circle3.x = circle2.x + circle.speed;
  ellipse(circle2.x, circle2.y, circle.size );

  circle4.fill = random(0, 255);
  circle4.x = random(0, width);
  circle4.y = random(0, height);
  fill(circle4.fill);
  //circle4.x = circle4.x + circle.speed;
  ellipse(circle4.x, circle4.y, circle.size );

  circle5.fill = random(0, 255);
  circle5.x = random(0, width);
  circle5.y = random(0, height);
  circle5.size = random(0, 35);
  fill(circle5.fill);
  //circle5.x = circle5.x + circle.speed;
  ellipse(circle5.x, circle5.y, circle.size );

  // headlights
  headlights.fill = random(0, 255);
  fill(headlights.fill);
  headlights.x = headlights.x + headlights.speed;

  if (headlights.x > width) {
    headlights.speed = -headlights.speed;
  }

  if (headlights.x < 0) {
    headlights.speed = -headlights.speed;
  }

  ellipse(headlights.x, headlights.y, headlights.size );

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}





// console.log(`circle.x: $(circle.x)`);
 // console.log(randomNumber);
