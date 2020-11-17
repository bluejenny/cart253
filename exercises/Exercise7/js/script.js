"use strict";

// Project 2
// Daydreamer to the nth Degree
// Jen Poohachoff

// **********************************************
//
//   _  /   /
//  |_ _   _  ._ o  _     _| / |_| o     _  ._
//  | (/_ (/_ |  | (/_   (_|   | | | \/ (/_ |
//
// **********************************************

// The opposite of doom scrolling
// a endless scenario that takes
// you away to other places
// untill such time you are called background
// to reality


let state = `room`  // states are room, leftWorld, topWorld, rightWorld, bottomWorld

//dark bckgrnd behind simulation
let bgDark = {
  r: 48,
  g: 65,
  b: 79,
};

//sky bacground, opacity fades as mouseY moves down
let bgLight = {
  r: 202,
  g: 225,
  b: 244
}

// the animated circles
let circles = [];

let airplane = {
  x: 0,
  y: 0,
  size: 15,
  angle: 0, // Facing right to start
  speed: 0, // Start out not moving
  maxSpeed: 10, // Moving at 5 pixels per frame
  acceleration: 0.1, // How much velocity is gained when accelerating
  braking: -0.5, // How much velocity is lost when breaking
  drag: -0.05 // How much velocity is lost when neither accelerating nor braking
};

// F-minor
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

let windSFX;
let sighSFX;
let sigh2SFX;
let snowSFX;

let synth;
let soundLoop;
// let notePattern = [80, 82, 84, 87, 89, 92];
let notePattern = [60, 72, 67, 64, 72, 80 ];

let synthPoly;
let interval;

// if loop is playing, set to true
let loopIsPlaying = false;

function preload() {
  windSFX = loadSound(`assets/sounds/wind-1.mp3`);
  sighSFX = loadSound(`assets/sounds/A-sigh.mp3`);
  sigh2SFX = loadSound(`assets/sounds/sigh.wav`);
  snowSFX = loadSound(`assets/sounds/snow.mp3`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // set airplane to center of screen
  centerAirplane();

  // standard colors
  stroke(77, 87, 99);
  strokeWeight(1);
  noFill();
  noCursor();

  // userStartAudio();
  let intervalInSeconds = 0.05;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  soundLoop.maxIterations = 12;
  synth = new p5.MonoSynth();
  synthPoly = new p5.PolySynth();

  //set mouse to center of screen
  resetMouse();
}

function centerAirplane() {
  airplane.x = width/2-30;
  airplane.y = height/2;
  airplane.angle = 0; // Facing right to start
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  if (state === `room`) {
    room();
  }
  else if (state === `leftWorld`) {
    leftWorld();
  }
  else if (state === `rightWorld`) {
    rightWorld();
  }
  else if (state === `topWorld`) {
    topWorld();
  }
  else if (state === `bottomWorld`) {
    bottomWorld();
  }

  // cursor
  line(mouseX - 5, mouseY, mouseX + 5, mouseY);
  line(mouseX, mouseY - 5, mouseX, mouseY + 5);

  // airplane
  handleInput();
  move();
  wrap();
  displayAirplane();


  // show + where user can click
  displayMarkers();


  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.grow();
    circle.display();
  }
}

function resetMouse() {
  mouseX = width/2;
  mouseY = height/2;
}

function parkAirplane() {
  airplane.x = width/6*5;
  airplane.y = height/2 + 200;
  airplane.angle = 0;
}

function room() {
  drawRoom();
}

function leftWorld() {
  backgroundFade(255, 200, 255);
  displayLandscape();
}

function rightWorld() {
  backgroundFade(202, 225, 245);
  displayLandscape();
}

function topWorld() {
  backgroundFade(245, 225, 244);
  displayLandscape();
}

function bottomWorld() {
  backgroundFade(48, 65, 79);
  displayLandscape();
}


// creates effect of canvas getting lighter or darker
// based on mouseY position, 0 = light, height = dark

function backgroundFade(r, g, b) {
  let m = map(mouseY, 0, height, 235, 0);
  fill(r, g, b, m);
  rect(0, 0, width, height); //light sky
}

function drawRoom() {
  push();
  //adjust opacity of fill by mouseY position
  let o = map(mouseY, 0, height, 255, 150);
  fill(235, o);
  rect(0, 0, width, height); // room background

  // top diagonal lines
  line(0, 0, width/2-width/3, 100);
  line(width, 0, width/2+width/3, 100);

  // bottom diagonal lines
  line(0, height-50, width/2-width/3, height-150);
  line(width, height-50, width/2+width/3, height-150);

  // top and bottom horizonatal line
  line(width/2-width/3, 100, width/2+width/3, 100);
  line(width/2-width/3, height-150, width/2+width/3, height-150);

  // left and right vertical line
  line(width/2-width/3, 100, width/2-width/3, height-150);
  line(width/2+width/3, 100, width/2+width/3, height-150);

  // screen
  // fill(225, o);
  // rect(width/2-width/10, height/2-75, width/10*2, height/5);
  pop();
}

function displayLandscape() {
  push();
  //bckgrnd mts
  let opacity = map(mouseY, 0, height, 200, 50);
  fill(87, 97, 109, opacity);
  stroke(255, opacity);

  // mtns back
  triangle(mouseX-width/8, 2*height/3+20, 0, height/3-100, 0, height);
  triangle(mouseX+width/8, 2*height/3+20, width, height/3-100, width, height);

  // mtns front
  fill(87, 97, 109);
  triangle(mouseX+30, 2*height/3, 0, height/2-30, 0, height-100);
  triangle(mouseX-30, 2*height/3, width, height/2-50, width, height-100);

  fill(77, 87, 99);
  triangle(mouseX-10, 2*height/3, 0, height/2+55, 0, height);
  triangle(mouseX+10, 2*height/3, width, height/2+55, width, height);

  //land
  fill(142, 163, 180, 220);
  rect(0, 2*height/3, width, height/2);
  pop();
}

function displayMarkers() {
  //displays a graph of + markers to show user where to click
  push();
  let m = map(mouseY, 0, height, 235, 0);
  strokeWeight(1);
  stroke(47, m);

  // example of points where sound will play --> top line
  line(width / 2 - 5, height / 2 - 200, width / 2 + 5, height / 2 - 200);
  line(width / 2, height / 2 - 205, width / 2, height / 2 - 195);

  line(width / 6 - 5, height / 2 - 200, width / 6 + 5, height / 2 - 200);
  line(width / 6, height / 2 - 205, width / 6, height / 2 - 195);

  line(
    (width / 6) * 5 - 5,
    height / 2 - 200,
    (width / 6) * 5 + 5,
    height / 2 - 200
  );
  line((width / 6) * 5, height / 2 - 205, (width / 6) * 5, height / 2 - 195);

  // example of points where sound/animation will start --> center line
  line(width / 2 - 5, height / 2, width / 2 + 5, height / 2);
  line(width / 2, height / 2 - 5, width / 2, height / 2 + 5);

  line(width / 6 - 5, height / 2, width / 6 + 5, height / 2);
  line(width / 6, height / 2 - 5, width / 6, height / 2 + 5);

  line((width / 6) * 5 - 5, height / 2, (width / 6) * 5 + 5, height / 2);
  line((width / 6) * 5, height / 2 - 5, (width / 6) * 5, height / 2 + 5);

  // example of points where sound will be activated --> bottom line
  line(width / 2 - 5, height / 2 + 200, width / 2 + 5, height / 2 + 200);
  line(width / 2, height / 2 + 205, width / 2, height / 2 + 195);

  line(width / 6 - 5, height / 2 + 200, width / 6 + 5, height / 2 + 200);
  line(width / 6, height / 2 + 205, width / 6, height / 2 + 195);

  line(
    (width / 6) * 5 - 5,
    height / 2 + 200,
    (width / 6) * 5 + 5,
    height / 2 + 200
  );
  line((width / 6) * 5, height / 2 + 205, (width / 6) * 5, height / 2 + 195);
  pop();
}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth.play(note, 0.025, timeFromNow);
}

function mousePressed() {
  //first row

  userStartAudio();

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    if (loopIsPlaying) {
      windSFX.stop();
      sighSFX.stop();
      loopIsPlaying = false;
    } else {
      windSFX.loop();
      loopIsPlaying = true;
    }
  }

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    sighSFX.play();
  }

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    windSFX.play();
  }

  //middle row

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
  }

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
    // centerAirplane();
  }

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    createCircle(mouseX, mouseY);
  }

  // bottom row
  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {
    if (loopIsPlaying) {
      snowSFX.stop();
      loopIsPlaying = false;
    } else {
      snowSFX.loop();
      loopIsPlaying = true;
    }
  }

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {
    // check to see if playing
    if (interval === undefined) {
      // Start interval, calling playRandomNote every 100 milliseconds
      interval = setInterval(playRandomNote, 100);
    } else {
      // stop play
      clearInterval(interval);
      interval = undefined;
    }
  }

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {
    if (soundLoop.isPlaying) {
      soundLoop.stop();
    } else {
      // start the loop
      soundLoop.start();
      parkAirplane();
    }
  }
}

// playRandomNote() plays a random note
function playRandomNote() {
  // Chose a random note
  let note = random(notes);
  // Play it
  synth.play(note, 1, 0, 1);
}

function createCircle(x, y) {
  let note = random(notes);
  let circle = new Circle(x, y, note);
  circles.push(circle);
}

function createSnowflake(x, y) {
  let snowflake = new Snowflake(x, y);
  snowflake.push(snowflake);
}

// example of a key pressed sound
function keyPressed() {
  if (key === "a") {
    sigh2SFX.play();
  }
  if (keyCode === RETURN) {
    state = `room`;
    centerAirplane();
  }
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    // Turn LEFT if the LEFT arrow is pressed
    airplane.angle -= 0.05;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    // Turn RIGHT if the RIGHT arrow is pressed
    airplane.angle += 0.05;
  }

  if (keyIsDown(UP_ARROW)) {
    // Accelerate forward if the UP ARROW is pressed
    airplane.speed += airplane.acceleration;
    airplane.speed = constrain(airplane.speed, 0, airplane.maxSpeed);
  }
  // Brake if the DOWN ARROW is pressed
  else if (keyIsDown(DOWN_ARROW)) {
    airplane.speed += airplane.braking;
    airplane.speed = constrain(airplane.speed, 0, airplane.maxSpeed);
  }
  else {
    // Apply drag if neither are pressed
    airplane.speed += airplane.drag;
    airplane.speed = constrain(airplane.speed, 0, airplane.maxSpeed);
  }
}

function move() {
  // The magical formula!
  let vx = airplane.speed * cos(airplane.angle);
  let vy = airplane.speed * sin(airplane.angle);

  // Move the circle with the calculated velocities
  airplane.x += vx;
  airplane.y += vy;
}

function wrap() {
  if (airplane.x > width) {
    airplane.x -= width;
    state = `rightWorld`;
  }
  else if (airplane.x < 0) {
    airplane.x += width;
    state = `leftWorld`;
  }

  if (airplane.y > height) {
    airplane.y -= height;
    state = `bottomWorld`;
  }
  else if (airplane.y < 0) {
    airplane.y += height;
    state = `topWorld`;
  }
}

function displayAirplane() {
  push();
  // translate to the airplane's centre
  translate(airplane.x, airplane.y);
  // Then rotate by its angle
  rotate(airplane.angle);
  fill(175);
  triangle(-20, -20, 0, 0, 80, -30);
  fill(175);
  triangle(30, 30, 0, 0, 80, -30);
  fill(145);
  triangle(0, 20, 0, 0, 15, 15);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
