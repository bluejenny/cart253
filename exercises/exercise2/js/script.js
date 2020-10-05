/**************************************************
Exercise 2: Dodge-em
Jennifer Poohachoff

credits:
Mosquito image - Created by Edward Boatman, Noun Project
Tree code - https://editor.p5js.org/creativecoding/sketches/GlTvrpxn5

avoid the mosquito if you can, by clicking the mouse the day moves towards
night and the mosquitos get larger and faster
**************************************************/

//variables

//circle for mosquito
let circle = {
  x: 0,
  y: 500,
  size: 25,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.25,
  maxSpeed: 10
}

//circle for mosquito2
let circle2 = {
  x: 0,
  y: 500,
  size: 25,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.5,
  maxSpeed: 6
}

//circle for mosquito
let circle3 = {
  x: 0,
  y: 500,
  size: 25,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.5,
  maxSpeed: 8
}

//background
let bg = {
  r: 0,
  g: 192,
  b: 255
}

//circle for clown
let user = {
  x: 250,
  y: 250,
  size: 75,
  fill: 255
}

let imgclwnSize = 100;
let mosquitoSize = 25;
let sizeIncrease = 10;
//for the stars in the sky
let numStatic = 25;

//image variables
let mosquito;
let mosquito2;
let mosquito3;
let imgclwn;
let imgclwnSad;

//preload images
function preload() {
  imgclwn = loadImage('assets/images/clown.png');
  mosquito = loadImage('assets/images/mosquito.png');
  mosquito2 = loadImage('assets/images/mosquito2.png');
  mosquito3 = loadImage('assets/images/mosquito.png');
  imgclwnSad = loadImage('assets/images/clown2.png');
}

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

//randomize where mosquitos enter screen
  circle.y = random(0, height);
  circle.vx = circle.maxSpeed;

  circle2.x = random(width, 0);
  circle2.vx = circle.maxSpeed;

  circle3.y = random(0, height);
  circle3.vx = circle.maxSpeed;

  //control the user position with clown face img
  //to avoid noLoop on start
  user.x = width/2;
  user.y = height/2;

  noCursor();
}


function draw() {
  background(bg.r, bg.g, bg.b);

  //display static just for fun!
  push();
  for (let i = 0; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
  }
  pop();

  //user movement
  user.x = mouseX;
  user.y = mouseY;

  //movement of mosquito circles on page

  //circle
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
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed);
  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  //circle2
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

  circle2.vx = circle2.vx + circle2.ax;
  circle2.vx = constrain(circle2.vx, -circle2.maxSpeed, circle2.maxSpeed);
  circle2.vy = circle2.vy + circle2.ay;
  circle2.vy = constrain(circle2.vy, -circle2.maxSpeed, circle2.maxSpeed);

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;

  //circle3
  if (mouseX < circle2.x) {
    circle3.ax = -circle3.acceleration;
  }
  else {
    circle3.ax = circle3.acceleration;
  }

  if (mouseY < circle2.y) {
    circle3.ay = -circle3.acceleration;
  }
  else {
    circle3.ay = circle3.acceleration;
  }

  circle3.vx = circle3.vx + circle3.ax;
  circle3.vx = constrain(circle3.vx, -circle3.maxSpeed, circle3.maxSpeed)
  circle3.vy = circle3.vy + circle3.ay;
  circle3.vy = constrain(circle3.vy, -circle3.maxSpeed, circle3.maxSpeed)

  circle3.x = circle3.x + circle3.vx;
  circle3.y = circle3.y + circle3.vy;

  //end movement of mosquito circles on page


  //dislay the mosquito circles but make them transparent
  push();
  fill(0, 191, 255, 0);
  ellipse(circle.x, circle.y, circle.size);
  ellipse(circle2.x, circle2.y, circle2.size);
  ellipse(circle3.x, circle3.y, circle3.size);
  pop();

  //display covid19 circle
  // fill(mosqCircle.fill.r, mosqCircle.fill.g, mosqCircle.fill.b);
  // ellipse(mosqCircle.x, mosqCircle.y, mosqCircle.size);

  // Draw a pine tree shape using the vertex() function
  push();
    fill(4, 124, 81);

    translate(-150, -20);
    beginShape();
    vertex(300, 70);
    vertex(260, 150);
    vertex(280, 150);
    vertex(220, 230);
    vertex(260, 230);
    vertex(190, 310);
    vertex(280, 310);
    vertex(280, 350);
    vertex(320, 350);
    vertex(320, 310);
    vertex(410, 310);
    vertex(340, 230);
    vertex(380, 230);
    vertex(320, 150);
    vertex(340, 150);
    endShape(CLOSE);

    translate(width-300, height/3);
    beginShape();
    vertex(300, 70);
    vertex(260, 150);
    vertex(280, 150);
    vertex(220, 230);
    vertex(260, 230);
    vertex(190, 310);
    vertex(280, 310);
    vertex(280, 350);
    vertex(320, 350);
    vertex(320, 310);
    vertex(410, 310);
    vertex(340, 230);
    vertex(380, 230);
    vertex(320, 150);
    vertex(340, 150);
    endShape(CLOSE);
  pop();

  //display user circle
  ellipse(user.x, user.y, user.size);

  //display images
  imageMode(CENTER);
  image(imgclwn, mouseX, mouseY, imgclwnSize, imgclwnSize);
  image(mosquito, circle.x, circle.y, mosquitoSize, mosquitoSize);
  image(mosquito2, circle2.x, circle2.y, mosquitoSize, mosquitoSize);
  image(mosquito3, circle3.x, circle3.y, mosquitoSize, mosquitoSize);

  //check for getting bitten by mosquitos

  //mosquito
  let d = dist(user.x, user.y, circle.x, circle.y);

  if (d < circle.size/2 + user.size/2) {
    image(imgclwnSad, mouseX, mouseY, imgclwnSize, imgclwnSize);
    noLoop();
  }

  //mosquito2
  let d2 = dist(user.x, user.y, circle2.x, circle2.y);

  if (d2 < circle2.size/2 + user.size/2) {
    image(imgclwnSad, mouseX, mouseY, imgclwnSize, imgclwnSize);
    noLoop();
  }

  //mosquito3
  let d3 = dist(user.x, user.y, circle3.x, circle3.y);

  if (d3 < circle2.size/2 + user.size/2) {
    image(imgclwnSad, mouseX, mouseY, imgclwnSize, imgclwnSize);
    noLoop();
  }

}

//increase size when img is clicked on and make the background darker blue
function mousePressed() {
  circle.size += sizeIncrease;
  mosquitoSize += sizeIncrease;
  bg.g = bg.g - 20;
  bg.b = bg.b -10;
  circle.maxSpeed += 1;
  circle2.maxSpeed += .5;
  circle3.maxSpeed += .5;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
