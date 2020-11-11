"use strict";

/**************************************************
06 - Sound
with Pippin Barr
**************************************************/

let barkSFX;
let sighSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
  sighSFX = loadSound(`assets/sounds/sigh.wav`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();
}


function draw() {
  background(0);

  let newRate = map(mouseX, 0, width, -3, 3);
  barkSFX.rate(newRate);
}

function mousePressed() {
  barkSFX.loop();
}

function keyPressed() {
  sighSFX.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
