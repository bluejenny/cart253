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
// untill such time you are called
// back to reality

let state = `room`; // states are room, leftWorld, topWorld, rightWorld, bottomWorld

//dark bckgrnd behind simulation
let bgDark = {
  r: 48,
  g: 65,
  b: 79,
};

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
  drag: -0.05, // How much velocity is lost when neither accelerating nor braking
};

let landscapeY = 0;
let landsacpeVY = 1;

let randomWidth;
let randomHeight;

// F-minor
let notesF = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// random
let notesD = [`D4`, `E4`, `F4`, `G4`, `A4`, `Bb5`, `C4`, `D4`];

let windSFX;
let sighSFX;
let sigh2SFX;
let snowSFX;
let walkinparkSFX;

let synth;
let soundLoop;
// let notePattern = [80, 82, 84, 87, 89, 92];
let notePattern = [60, 72, 67, 64, 72, 80];

let synthPoly;
let interval;

// if loop is playing, set to true
let loopIsPlaying = false;

function preload() {
  windSFX = loadSound(`assets/sounds/wind-1.mp3`);
  sighSFX = loadSound(`assets/sounds/A-sigh.mp3`);
  sigh2SFX = loadSound(`assets/sounds/sigh.wav`);
  snowSFX = loadSound(`assets/sounds/snow.mp3`);
  walkinparkSFX = loadSound(`assets/sounds/walk-in-the-park.wav`);
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

  //set landscapeY to height for moving landscape down or up screen
  landscapeY = height;

  randomWidth = random(0, width);
  randomHeight = random(0, height);

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
  airplane.x = width / 2 - 30;
  airplane.y = height / 2;
  airplane.angle = 0; // Facing right to start
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  if (state === `room`) {
    room();
    drawCursor();
  } else if (state === `leftWorld`) {
    leftWorld();
  } else if (state === `rightWorld`) {
    rightWorld();
  } else if (state === `topWorld`) {
    topWorld();
  } else if (state === `bottomWorld`) {
    bottomWorld();
  }

  // check to see if someone is clicking on a marker
  checkMarkers();
  displayMarkers();

  // airplane
  handleInput();
  move();
  wrap();
  displayAirplane();

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.grow();
    circle.display();
  }
}

function drawCursor() {
  // cursor


  push();
  // fill(random(230, 235), 150);
  stroke(random(200, 235), 200);
  line(mouseX - 5, mouseY, mouseX + 5, mouseY);
  line(mouseX, mouseY - 5, mouseX, mouseY + 5);
  noStroke();
  // ellipse(mouseX, mouseY, 10);
  pop();
}

function resetMouse() {
  mouseX = width / 2;
  mouseY = height / 2;
}

function parkAirplane() {
  airplane.x = (width / 6) * 5 - 30;
  airplane.y = height / 2 + 200;
  airplane.angle = 0;
}

function drawController(x, y) {
  push();
  noStroke();
  fill(50, 100);
  //bottom
  triangle(x - 8, y + 45, x + 8, y + 45, x, y + 55);
  //top
  triangle(x - 8, y - 45, x + 8, y - 45, x, y - 55);
  //left
  triangle(x - 55, y - 8, x - 55, y + 8, x - 65, y);
  //right
  triangle(x + 55, y - 8, x + 55, y + 8, x + 65, y);
  pop();
}

function room() {
  // drawCursor();
  drawRoom();
  // drawController(width / 2, height / 2);
}

function leftWorld() {
  backgroundFade(255, 200, 255);
  drawSun();
  displayLandscapeLeft();
  // drawController((width / 6) * 5, height / 2 + 200);
}

function rightWorld() {
  backgroundFade(245, 225, 244);
  drawSun();
  displayLandscape();
  // drawController((width / 6) * 5, height / 2 + 200);
}

function topWorld() {
  drawCursor();
  backgroundFade(48, 65, 79);
  drawSun();
  displayLandscape();
  // drawController((width / 6) * 5, height / 2 + 200);
}

function bottomWorld() {
  drawCursor();
  backgroundFade(202, 225, 245);
  drawSun();
  displayLandscape();
  // drawController((width / 6) * 5, height / 2 + 200);
}

// creates effect of canvas getting lighter or darker
// based on mouseY position, 0 = light, height = dark

function backgroundFade(r, g, b) {
  let m = map(mouseY, 0, height, 255, 0);
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
  line(0, 0, width / 2 - width / 3, 100);
  line(width, 0, width / 2 + width / 3, 100);

  // bottom diagonal lines
  line(0, height - 50, width / 2 - width / 3, height - 150);
  line(width, height - 50, width / 2 + width / 3, height - 150);

  // top and bottom horizonatal line
  line(width / 2 - width / 3, 100, width / 2 + width / 3, 100);
  line(width / 2 - width / 3, height - 150, width / 2 + width / 3, height - 150);

  // left and right vertical line
  line(width / 2 - width / 3, 100, width / 2 - width / 3, height - 150);
  line(width / 2 + width / 3, 100, width / 2 + width / 3, height - 150);


  fill(225, o);
  // door window
  rect(width/2-width/18, height/2-height/5, width/18*2, height-450);
  // window left glass
  rect(width/3-10, height / 2 - 175, 33, 65);
  rect(width/3 +27, height / 2 - 175, 33, 65);

  rect(width/3-10, height / 2 - 105, 33, 65);
  rect(width/3 +27, height / 2 - 105, 33, 65);

  rect(width/3-10, height / 2 - 30, 70, height / 2 - 240);
  // rect(width/3 -60, height / 2 - 175, width/22, height / 2 - 290);

  push();
  translate(width/3-50, 0);
  rect(width/3-10, height / 2 - 175, 33, 65);
  rect(width/3 +27, height / 2 - 175, 33, 65);

  rect(width/3-10, height / 2 - 105, 33, 65);
  rect(width/3 +27, height / 2 - 105, 33, 65);

  rect(width/3-10, height / 2 - 30, 70, height / 2 - 240);
  pop();



  noFill();
  // door
  rect(width/2-width/12, height / 2 - 200, width/12*2, height / 2 + 50);



  pop();


}

function drawSun() {
  push();
  stroke(random(200, 235));
  ellipseMode(CENTER);

  let points = 16; //number of points
  let pointAngle = 360 / points; //angle between points
  let radius = width / 2; //length of each line from centre to edge of circle

  //check to see if on mobile screen (vertical)
  if (width / 2 < height / 2) {
    radius = height / 2;
  }

  for (let angle = 270; angle < 630; angle = angle + pointAngle) {
    let x = cos(radians(angle)) * radius; //convert angle to radians for x and y coordinates
    let y = sin(radians(angle)) * radius;
    line(mouseX, mouseY, mouseX + x, mouseY + y);
  }
  pop();
}

function displayLandscapeLeft() {
  push();

  //bckgrnd mts
  let opacity = map(mouseY, 0, height, 200, 50);
  fill(87, 97, 109, opacity);
  stroke(255, opacity);

  // mtns back
  triangle(mouseX - width / 8, (landscapeY) / 3, 0, landscapeY / 3 - 200, 0, landscapeY);
  triangle(mouseX + width / 8, (landscapeY) / 3, width, landscapeY / 3 - 200, width, landscapeY);

  // mtns front
  fill(87, 97, 109);
  triangle(mouseX + 30, (landscapeY) / 3, 0, landscapeY / 3 - 30, 0, landscapeY - 200);
  triangle(mouseX - 30, (landscapeY) / 3, width, landscapeY / 3 - 50, width, landscapeY - 200);

  fill(77, 87, 99);
  triangle(mouseX - 10, (landscapeY) / 3, 0, landscapeY / 3, 0, landscapeY-300);
  triangle(mouseX + 10, (landscapeY) / 3, width, landscapeY / 3, width, landscapeY-300);

  //land
  fill(142, 163, 180, 220);
  rect(0, 0, width, (landscapeY) / 3);
  pop();
}

function displayLandscape() {
  push();

  //land
  fill(142, 163, 180, 200);
  rect(0, (2 * landscapeY) / 3, width, height);

  //bckgrnd mts
  let opacity = map(mouseY, 0, height, 200, 50);
  fill(87, 97, 109, opacity);
  stroke(255, opacity);

  // mtns back
  triangle(mouseX - width / 8, (2 * landscapeY) / 3 + 20, 0, landscapeY / 3 - 100, 0, landscapeY);
  triangle(mouseX + width / 8, (2 * landscapeY) / 3 + 20, width, landscapeY / 3 - 100, width, landscapeY);

  // mtns front
  fill(87, 97, 109);
  triangle(mouseX + 30, (2 * landscapeY) / 3, 0, landscapeY / 2 - 30, 0, landscapeY - 100);
  triangle(mouseX - 30, (2 * landscapeY) / 3, width, landscapeY / 2 - 50, width, landscapeY - 100);

  fill(77, 87, 99);
  triangle(mouseX - 10, (2 * landscapeY) / 3, 0, landscapeY / 2 + 55, 0, landscapeY);
  triangle(mouseX + 10, (2 * landscapeY) / 3, width, landscapeY / 2 + 55, width, landscapeY);

  //land
  fill(142, 163, 180, 220);
  rect(0, (2 * landscapeY) / 3, width, height);
  pop();
}

function displayMarkers() {
  //displays a graph of + markers to show user where to click
  push();

  // markers

  //top

  //top-left
  line(width / 2 - 5, height / 2 - 200, width / 2 + 5, height / 2 - 200);
  line(width / 2, height / 2 - 205, width / 2, height / 2 - 195);

  //top-middle
  line(width / 6 - 5, height / 2 - 200, width / 6 + 5, height / 2 - 200);
  line(width / 6, height / 2 - 205, width / 6, height / 2 - 195);

  //top-right
  line(
    (width / 6) * 5 - 5,
    height / 2 - 200,
    (width / 6) * 5 + 5,
    height / 2 - 200
  );
  line((width / 6) * 5, height / 2 - 205, (width / 6) * 5, height / 2 - 195);

  // middle line

  // middle left
  line(width / 2 - 5, height / 2, width / 2 + 5, height / 2);
  line(width / 2, height / 2 - 5, width / 2, height / 2 + 5);

  //middle center
  line(width / 6 - 5, height / 2, width / 6 + 5, height / 2);
  line(width / 6, height / 2 - 5, width / 6, height / 2 + 5);

  // middle right
  line((width / 6) * 5 - 5, height / 2, (width / 6) * 5 + 5, height / 2);
  line((width / 6) * 5, height / 2 - 5, (width / 6) * 5, height / 2 + 5);

  // bottom line

  // bottom left
  line(width / 2 - 5, height / 2 + 200, width / 2 + 5, height / 2 + 200);
  line(width / 2, height / 2 + 205, width / 2, height / 2 + 195);

  // bottom middle
  line(width / 6 - 5, height / 2 + 200, width / 6 + 5, height / 2 + 200);
  line(width / 6, height / 2 + 205, width / 6, height / 2 + 195);

  // bottom right
  // noFill();
  // noStroke();
  // ellipse(width / 6 * 5, height / 2 + 200, 80);
  line((width / 6) * 5 - 5, height / 2 + 200, (width / 6) * 5 + 5, height / 2 + 200);
  line((width / 6) * 5, height / 2 + 205, (width / 6) * 5, height / 2 + 195);
  pop();
}

function checkMarkers() {

}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth.play(note, 0.025, timeFromNow);
}

function mousePressed() {
  createCircle(mouseX, mouseY);

  //first row

  userStartAudio();

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    if (loopIsPlaying) {
      walkinparkSFX.stop();
      loopIsPlaying = false;
    } else {
      walkinparkSFX.loop();
      // walkinparkSFX.volume(0);
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
  let note = random(notesF);
  // Play it
  synth.play(note, 1, 0, 1);
}

function createCircle(x, y) {
  let note = random(notesD);
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

// move landsacpe line as plane moves forward
function moveMouseX() {
  mouseX = mouseX - 1;
  mouseY = mouseY + 0.5;
  if (mouseX < 0 + width / 13) {
    mouseX = width - width / 6;
  }
  if (mouseY > 600) {
    mouseX = width;
    mouseY = 0;
  }
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    // Turn LEFT if the LEFT arrow is pressed
    airplane.angle -= 0.05;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // Turn RIGHT if the RIGHT arrow is pressed
    airplane.angle += 0.05;
  }

  if (keyIsDown(UP_ARROW)) {
    // Accelerate forward if the UP ARROW is pressed
    airplane.speed += airplane.acceleration;
    airplane.speed = constrain(airplane.speed, 0, airplane.maxSpeed);
    if (state === `rightWorld`) {
    moveMouseX();
    }
    if (state === `topWorld`) {
    landscapeY += landsacpeVY;
    mouseY += landsacpeVY;
    }
    if (state === `bottomWorld`) {
    landscapeY += -landsacpeVY;
    mouseY += -landsacpeVY;
    }
  }
  // Brake if the DOWN ARROW is pressed
  else if (keyIsDown(DOWN_ARROW)) {
    airplane.speed += airplane.braking;
    airplane.speed = constrain(airplane.speed, 0, airplane.maxSpeed);
  } else {
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
  } else if (airplane.x < 0) {
    airplane.x += width;
    state = `leftWorld`;
  }

  if (airplane.y > height) {
    airplane.y -= height;
    state = `bottomWorld`;
  } else if (airplane.y < 0) {
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
