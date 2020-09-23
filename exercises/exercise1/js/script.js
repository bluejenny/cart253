/**************************************************
03 I like to move it!
Jen Poohachoff
**************************************************/

let bg = {
  r: 0,
  g: 0,
  b: 0
}

let rect1 = {
  x: 0,
  y: 50,
  width: 100,
  height: 150,
  speed: 6
}

let rect2 = {
  x: 0,
  y: 200,
  width: 100,
  height: 150,
  speed: -4
}

let circ1 = {
  x: 0,
  y: 0,
  fill: 0,
  size: 25,
  speed: 1.25,
  growth: .15
}

// make canvas fit to screen
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //move rect2 to right of canvas
  rect2.x = width;

}

// draw an exclamation point
function draw() {

  //background color maps green and blue values to
  //mouseX and mouseY, r gets larger (colors get more saturated)
  //as circle moves down screen
  background(bg.r, bg.g, bg.b);
  bg.r = map(circ1.y, 0, height, 0, 255);
  bg.g = map(mouseY, 0, width, 0, 255);
  bg.b = map(mouseX, 0, height, 0, 255);
  // bg.r = random(0, 255);

  //reposition circle so always in middle
  circ1.x = width/2;

  //animation of rectangles
  fill(255, 200);
  rect(rect1.x, rect1.y, rect1.width, rect1.height);
  rect(rect2.x, rect2.y, rect2.width, rect2.height);
  rect1.x += rect1.speed;
  rect1.x = constrain(rect1.x, 0, width/2-50);
  rect2.x += rect2.speed;
  rect2.x = constrain(rect2.x, width/2-50, width );

  //animation of circle
  fill(255);
  ellipse(circ1.x, circ1.y, circ1.size);
  circ1.y += circ1.speed;
  circ1.y = constrain(circ1.y, 0, rect2.y + rect2.height + 100 );
  circ1.size += circ1.growth;
  circ1.size = constrain(circ1.size, 0, 125 );

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
