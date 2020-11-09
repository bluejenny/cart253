"use strict";

/**************************************************
10 - More Sound Oscillator
with Pippin Barr
**************************************************/

let osclr;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();

  osclr = new p5.Oscillator(440, `sine`);
}

function draw() {
  background(0);

  let noiseValue = noise(t);

  let newFreq = map(mouseY, height, 0, 0, 880);
  osclr.freq(newFreq);

  let newAmp = map(mouseX, 0, width, 0, 1);
  osclr.amp(newAmp);
}

function mousePressed() {
  osclr.start();
}

function mouseReleased() {
  osclr.stop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
