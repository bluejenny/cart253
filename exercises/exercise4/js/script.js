"use strict";

/**************************************************
07 - Intermediate Functions
with Pippin Barr
**************************************************/

let user = {
  x: 0,
  y: 0,
  size: 100
}

let food1;
let food2;
let food3;
let food4;

function setup() {
  createCanvas(windowWidth, windowHeight);

  food1 = createFood(250, height/2);
  food2 = createFood(350, height/2);
  food3 = createFood(450, height/2);
  food4 = createFood(550, height/2);
}

function createFood(x, y) {
  let food = {
    x: x,
    y: y,
    size: 50,
    eaten: false
  }
  return food;
}


function draw() {
  background(0);

  moveUser();

  checkFood(food1);
  checkFood(food2);
  checkFood(food3);
  checkFood(food4);

  displayUser();
  displayFood(food1);
  displayFood(food2);
  displayFood(food3);
  displayFood(food4);
}

function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}


function checkFood(food) {
  if (!food.eaten) {
    let d = dist(user.x, user.y, food.x, food.y);
    if (d < user.size / 2 + food.size /2) {
      food.eaten = true;
    }
  }
}

function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

function displayFood(food) {
  if (!food.eaten) {
    push();
    fill(255, 100, 100);
    ellipse(food.x, food.y, food.size);
    pop();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
