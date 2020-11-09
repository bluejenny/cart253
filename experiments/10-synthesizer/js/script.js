"use strict";

/**************************************************
06 - Sound SYNTHESIZER
with Pippin Barr
**************************************************/

let synth;
let notes = [`F3`, `G3`, `Ab3`, `Bb3`, `C3`, `Db3`, `F4`]; //F-minor

function setup() {
  createCanvas(windowWidth, windowHeight);

  synth = new p5.PolySynth();
  userStartAudio();
}


function draw() {
  background(0);


}

function keyPressed() {
  let randomNote = random(notes);
  synth.play(randomNote, 1, 0, .25);

  // setInterval(playRandomNote, 500);

}

function playRandomNote() {
  let randomNote = random(notes);
  synth.play(randomNote, 1, 0, .25);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
