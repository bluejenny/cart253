"use strict";

/**************************************************
07 - Arrays
with Pippin Barr
**************************************************/

let user = {
  x: 0,
  y: 0,
  size: 100
}

let school = [];

let numFish = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numFish; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2
  }
  return fish;
}


function draw() {
  background(0);

  moveUser();

  for (let i = 0; i < school.length; i++) {
      checkFish(school[i]);
      moveFish(school[i]);
      displayFish(school[i]);
    }

  displayUser();
}

function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function moveFish(fish) {
  let change = random(0, 1);
  if (change < .05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}


function checkFish(fish) {
  if (!fish.eaten) {
    let d = dist(user.x, user.y, fish.x, fish.y);
    if (d < user.size / 2 + fish.size /2) {
      fish.eaten = true;
    }
  }
}

function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

function displayFish(fish) {
  if (!fish.eaten) {
    push();
    fill(255, 100, 100);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

function mousePressed() {
  let fish = createFish(mouseX+100, mouseY+100);
  school.push(fish);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
