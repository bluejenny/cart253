/**************************************************
03 Moving Parts
Jen Poohachoff
**************************************************/

let bg = {
  r: 0,
  g: 0,
  b: 0
}

let circle1 = {
  x: 0,
  y: 250,
  size: 100,
  growth: 1,
  speed: 1,
  fill: 255,
  alpha: 200
}

let circle2 = {
  x: 500,
  y: 250,
  size: 75,
  sizeRatio: .25,
  speed: -1,
  fill: 255,
  alpha: 200
}


let rect1 = {
  x: 30,
  y: 20,
  width: 10,
  height: 55,
  // growth: 1,
  // speed: 1,
  // fill: 255,
  // alpha: 200
}

let circ1 = {
  x: 160,
  y: 99,
  size: 50,
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

}

// draw()
//
// Description of draw() goes here.
function draw() {
  //background animation
  background(bg.r, bg.g, bg.b);
  bg.g = map(mouseY, 0, width, 0, 255);
  bg.b = map(mouseX, 0, height, 0, 255);
  // bg.b = map(mouseY, 0, width, 0, 255);
  //bg.b = (mouseX * mouseY) / 2;
  // bg.b = mouseX + mouseY;

  //draw dominoes
  rect(rect1.x, rect1.y, rect1.width, rect1.height);
  rect(rect1.x +20, rect1.y, rect1.width, rect1.height);
  rect(rect1.x +40, rect1.y, rect1.width, rect1.height);
  rect(rect1.x +60, rect1.y, rect1.width, rect1.height);
  rect(rect1.x +80, rect1.y, rect1.width, rect1.height);

  ellipse(circ1.x, circ1.y, circ1.size);

  //rect(130, 100, 60, 75, 50, 50, 5, 5);

  //circle animation

  //left
  circle1.x += circle1.speed;
  circle1.x = constrain(circle1.x, 0, width);
  circle1.size += circle1.growth;
  circle1.size = constrain(circle1.size, 0, width);
  fill(circle1.fill, circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size);

  //right
  circle2.x += circle2.speed;
  circle2.x = constrain(circle2.x, 0, width)
  circle2.size = circle1.size * circle2.sizeRatio;
  fill(circle2.fill, circle2.alpha);
  ellipse(circle2.x, circle2.y, circle2.size);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
