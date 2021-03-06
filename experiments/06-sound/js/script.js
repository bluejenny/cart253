"use strict";

/**************************************************
06 - Sound
with Pippin Barr
**************************************************/

let barkSFX;


function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
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

function mousePressed() {
  if (!barkSFX.isPlaying()) {
  barkSFX.loop();
  }
}

function keyPressed() {
  barkSFX.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
