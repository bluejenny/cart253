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

let food1 = {
  x: 250,
  y: 300,
  size: 50,
  eaten: false
}

let food2 = {
  x: 350,
  y: 300,
  size: 50,
  alive: false
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);

  // let x = random(0, width);
  // let y = random(0, height);
  //
  // ellipse(x, y, 100);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
