"use strict";

/**************************************************
07 - Intermediate Functions
with Pippin Barr
**************************************************/

let fortunes = [
  `it's looking great`,
  `you will trip out`,
  `you are going to enjoy something today`,
  `Happiness is yours for the taking`,
  `You will meet someone special`,
];

let soliloquy = [
  `to be or not to be`,
  `that is the question`,
  `whether 'tis nobler in the mind`,
  `to suffer the slings and arrows`,
  `of outrageous fortune`,
  `or to take arms`,
  `against a sea of sorrow`,
  `and by opposing end them`,
];

let currentIndex = 0;

let chosenFortune = `Click to see your future`;

let circle = {
  x: 0,
  y: 0,
  size: 100,
  trail: [],
  trailSize: 20,
};

let barkSFX;

let rates = [1.5, 1.75, 2.25, 2.5, 2.75, 3];

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
}

function draw() {
  background(0);
  text(chosenFortune, width / 2, height / 2);
  text(soliloquy[currentIndex], width / 2, height / 3);

  circle.x = mouseX;
  circle.y = mouseY;

  for (let i = 0; i < circle.trail.length; i++) {
    let position = circle.trail[i];
    ellipse(position.x, position.y, circle.size);
  }

  ellipse(circle.x, circle.y, circle.size);

  let newTrailPosition = {
    x: circle.x,
    y: circle.y,
  };
  circle.trail.push(newTrailPosition);

  if (circle.trail.length > circle.trailSize) {
    circle.trail.shift();
  }
}

function mousePressed() {
  chosenFortune = random(fortunes);

  currentIndex += 1;

  if (currentIndex === soliloquy.length) {
    currentIndex = 0;
  }
  let randomRate = random(rates);
  barkSFX.rate(randomRate);
  barkSFX.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
