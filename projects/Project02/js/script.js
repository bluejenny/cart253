"use strict";

// Project 2
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

let state = `topWorld`; // states are room, leftWorld, topWorld, rightWorld, bottomWorld

//dark bckgrnd behind simulation
let bgDark = {
  r: 48,
  g: 65,
  b: 79,
};

//for the ice crystals
let hex = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

// the animated circles
let circles = [];

// snow falling animation
let snowflakes = [];
let snowFalling = false;

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
  vx: 0,
  vy: 0,
  movementSpeed: 2
};

let leftWorldBckgrnd = {
  r: 0,
  g: 0,
  b: 0
};

// set to move landscape
let landscapeY = 0;
let landsacpeVY = 1;

// F-minor
let notesF = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// random
let notesD = [`D4`, `E4`, `F4`, `G4`, `A4`, `Bb5`, `C4`, `D4`];

// sound effects
let windSFX;
let sighASFX;
let sighBSFX;
let sighCSFX;
let sighDSFX;
let sighESFX;
let sighFSFX;
let sighGSFX;
let sighHSFX;
let snowSFX;
let subDrop;  // center airplane sound
let walkinparkSFX;
let melodicloopSFX;
let mysteriousSFX;
let acidloopSFX;

// computer sound
let synth;
let soundLoop;
let notePattern = [60, 72, 67, 64, 72, 80];
let notePattern2 = [80, 82, 84, 87, 89, 92];

let synthPoly;
let interval;

// if loop is playing, set to true
let loopIsPlaying = false;

function preload() {
  windSFX = loadSound(`assets/sounds/wind-1.mp3`);
  sighASFX = loadSound(`assets/sounds/A-sigh.mp3`);
  sighBSFX = loadSound(`assets/sounds/B-sigh.mp3`);
  sighCSFX = loadSound(`assets/sounds/C-sigh.wav`);
  sighDSFX = loadSound(`assets/sounds/D-sigh.wav`);
  sighESFX = loadSound(`assets/sounds/E-sigh.wav`);
  sighFSFX = loadSound(`assets/sounds/F-sigh.wav`);
  sighGSFX = loadSound(`assets/sounds/G-sigh.wav`);
  sighHSFX = loadSound(`assets/sounds/H-sigh.wav`);
  snowSFX = loadSound(`assets/sounds/snow.mp3`);
  subDrop = loadSound(`assets/sounds/sub-drop_D_major.wav`);
  walkinparkSFX = loadSound(`assets/sounds/walk-in-the-park.wav`);
  melodicloopSFX = loadSound(`assets/sounds/melodic-drum-loop.wav`);
  mysteriousSFX = loadSound(`assets/sounds/mysterious.wav`);
  acidloopSFX = loadSound(`assets/sounds/acid-loop.wav`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // set airplane to center of screen
  centerAirplane();

  // standard colors
  stroke(77, 87, 99);
  strokeWeight(1);
  noCursor();

  //set landscapeY to height for moving landscape down or up screen
  landscapeY = height;

  //set random colors for leftWorld background
  setleftWorldBckgrnd();

  // userStartAudio();
  let intervalInSeconds = 0.05;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  soundLoop.maxIterations = 12;
  synth = new p5.MonoSynth();
  synthPoly = new p5.PolySynth();

  //set mouse to center of screen
  resetMouse();
}

function setleftWorldBckgrnd() {
  leftWorldBckgrnd.r = random(0, 256);
  leftWorldBckgrnd.g = random(0, 256);
  leftWorldBckgrnd.b = random(0, 256);
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  if (state === `room`) {
    room();
    // drawCursor();
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
  if (state !== 'room') {
  checkMarkers();
  displayMarkers();
  }

  if (mouseIsPressed && state !== `room`) {
  iceCrystals();
  }

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

function resetMouse() {
  mouseX = width / 2;
  mouseY = height / 2;
}

function centerAirplane() {
  push();
  airplane.x = width / 2 - 30;
  airplane.y = height / 2;
  airplane.angle = 0; // Facing right to start
  pop();
}

// function parkAirplane() {
//   airplane.x = (width / 6) * 5 - 30;
//   airplane.y = height / 2 + 200;
//   airplane.angle = 0;
// }

function drawController(x, y) {
  push();
  noStroke();
  let controlColor = color(50, 50, 50);
  controlColor.setAlpha(50 + 50 * sin(millis() / 1000));
  fill(controlColor);
  //bottom
  triangle(x - 8, y + 40, x + 8, y + 40, x, y + 50);
  //top
  triangle(x - 8, y - 40, x + 8, y - 40, x, y - 50);
  //left
  triangle(x - 45, y - 8, x - 45, y + 8, x - 55, y);
  //right
  triangle(x + 45, y - 8, x + 45, y + 8, x + 55, y);
  pop();
}

function room() {
  // drawCursor();
  drawRoom();
  drawController(width / 2, height / 2);
}

function leftWorld() {
  // backgroundFade(255, 200, 255);
  backgroundFade(leftWorldBckgrnd.r, leftWorldBckgrnd.g, leftWorldBckgrnd.b);
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
  // backgroundFade(48, 65, 79);
  backgroundFade(245, 225, 244);
  drawSun();
  displayLandscape();
  // drawController((width / 6) * 5, height / 2 + 200);
}

function bottomWorld() {
  // backgroundFade(202, 225, 245);
  backgroundFade(245, 225, 244);
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

  fill(205, o);
  // door
  rect(width/2-width/12, height / 2 - 200, width/12*2, height / 2 + 50);
  rect(width/2-width/18, height/2-height/5, width/18*2, height-450);

  // window left glass
  rect(width/3-10, height / 2 - 175, 33, 65);
  rect(width/3 +27, height / 2 - 175, 33, 65);

  rect(width/3-10, height / 2 - 105, 33, 65);
  rect(width/3 +27, height / 2 - 105, 33, 65);

  rect(width/3-10, height / 2 - 30, 70, 115);

  translate(width/3-50, 0);
  rect(width/3-10, height / 2 - 175, 33, 65);
  rect(width/3 +27, height / 2 - 175, 33, 65);

  rect(width/3-10, height / 2 - 105, 33, 65);
  rect(width/3 +27, height / 2 - 105, 33, 65);

  rect(width/3-10, height / 2 - 30, 70, 115);

  pop();
}

function drawSun() {
  push();
  stroke(random(200, 235));
  ellipseMode(CENTER);

  let points = 16; //number of points
  let pointAngle = 360 / points; //angle between points
  let radius = width; //length of each line from centre to edge of circle

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

function checkSnowFalling() {
  if (snowFalling) {
  fallingSnow();
  }
}

// redraws landscape but upside down
function displayLandscapeLeft() {
  push();

  checkSnowFalling()

  //bckgrnd mts
  let opacity = map(mouseY, 0, height, 200, 50);
  fill(87, 97, 109, opacity);
  stroke(255, opacity);

  // mtns back
  triangle(mouseX - width / 8, (landscapeY) / 3, 0, landscapeY / 3 - 200, 0, landscapeY);
  triangle(mouseX + width / 8, (landscapeY) / 3, width, landscapeY / 3 - 200, width, landscapeY);

  // mtns front
  fill(87, 97, 109, opacity);
  triangle(mouseX + 30, (landscapeY) / 3, 0, landscapeY / 3 - 30, 0, landscapeY - 200);
  triangle(mouseX - 30, (landscapeY) / 3, width, landscapeY / 3 - 50, width, landscapeY - 200);

  fill(77, 87, 99, opacity);
  triangle(mouseX - 10, (landscapeY) / 3, 0, landscapeY / 3, 0, landscapeY-300);
  triangle(mouseX + 10, (landscapeY) / 3, width, landscapeY / 3, width, landscapeY-300);

  //land

  fill(142, 163, 180, 220);
  rect(0, 0, width, (landscapeY) / 3);
  pop();
}

function displayLandscape() {
  push();
  noStroke();

  checkSnowFalling();

  //land
  fill(142, 163, 180, 200);
  rect(0, (2 * landscapeY) / 3, width, height);

  //bckgrnd mts
  let opacity = map(mouseY, 0, height, 200, 50);
  fill(87, 97, 109, opacity);
  stroke(255, opacity);

  // mtns back
  push();
  fill(77, 87, 99);
  triangle(mouseX - width / 8, (2 * landscapeY) / 3 + 20, 0, landscapeY / 3 - 100, 0, landscapeY);
  triangle(mouseX + width / 8, (2 * landscapeY) / 3 + 20, width, landscapeY / 3 - 100, width, landscapeY);
  pop();
  triangle(mouseX - width / 8, (2 * landscapeY) / 3 + 20, 0, landscapeY / 3 - 100, 0, landscapeY);
  triangle(mouseX + width / 8, (2 * landscapeY) / 3 + 20, width, landscapeY / 3 - 100, width, landscapeY);

  // mtns front
  fill(87, 97, 109);
  triangle(mouseX + 30, (2 * landscapeY) / 3, 0, landscapeY / 2 - 30, 0, landscapeY - 100);
  triangle(mouseX - 30, (2 * landscapeY) / 3, width, landscapeY / 2 - 50, width, landscapeY - 100);


  fill(97, 107, 119);
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

  //top-left
  let markerColor = color(77, 87, 99);
  markerColor.setAlpha(128 + 128 * sin(millis() / 1000));
  stroke(markerColor);
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


  // middle left
  line(width / 2 - 5, height / 2, width / 2 + 5, height / 2);
  line(width / 2, height / 2 - 5, width / 2, height / 2 + 5);

  //middle center
  line(width / 6 - 5, height / 2, width / 6 + 5, height / 2);
  line(width / 6, height / 2 - 5, width / 6, height / 2 + 5);

  // middle right
  line((width / 6) * 5 - 5, height / 2, (width / 6) * 5 + 5, height / 2);
  line((width / 6) * 5, height / 2 - 5, (width / 6) * 5, height / 2 + 5);


  // bottom left
  line(width / 2 - 5, height / 2 + 200, width / 2 + 5, height / 2 + 200);
  line(width / 2, height / 2 + 205, width / 2, height / 2 + 195);

  // bottom middle
  line(width / 6 - 5, height / 2 + 200, width / 6 + 5, height / 2 + 200);
  line(width / 6, height / 2 + 205, width / 6, height / 2 + 195);

  // bottom right
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

function createCircle2(x, y) {
  let note = random(notesF);
  let circle = new Circle2(x, y, note);
  circles.push(circle);
}

function fallingSnow() {

  push();
  noStroke();
  fill(240, 100);

  // draw falling snow
   let t = frameCount / 60; // update time

   //create a random number of snowflakes each frame
   for (let i = 0; i < random(1); i++) {
     snowflakes.push(new snowflake()); // append snowflake object
   }

   //loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }

    pop();
}

function snowflake() {
  //code from p5.js

  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

//draws a hexagon
function hexagon (x, y, r) {

	push();
  translate(x, y);
  beginShape();
	for (var i = 0; i < 7; i++) {

		let x = r * cos(TWO_PI/6 * i + TWO_PI/12);
		let y = r * sin(TWO_PI/6 * i + TWO_PI/12);
		vertex(x, y);

	}
	endShape();
  pop();

}

function iceCrystals() {
  push();
  for (let i = 0; i < 1; i++) {
    noStroke();
    hex.fill = random(200, 175);
    hex.x = hex.x + hex.speed;
    fill(hex.fill);

    //circle top right
    hex.size = random(0, 40);
    hex.x = random(mouseX, width);
    hex.y = random(0, mouseY);
    hexagon(hex.x, hex.y, hex.size);

    //circle bottom left
    hex.size = random(0, 30);
    hex.x = random(0, mouseX);
    hex.y = random(height, mouseY);
    hexagon(hex.x, hex.y, hex.size);

    //circle top left
    hex.x = random(0, mouseX);
    hex.y = random(0, mouseY);
    hexagon(hex.x, hex.y, hex.size);

    //circle bottom right
    hex.x = random(mouseX, width);
    hex.y = random(height, mouseY);
    hexagon(hex.x, hex.y, hex.size);
  }
  pop();
}

function mousePressed() {
  if (state !== `room`) {
    if (state === `rightWorld`) {
  createCircle(mouseX, mouseY);
} else if (state === `topWorld`) {
createCircle2(mouseX, mouseY);
}


  }

  //first row
  // top left marker - start and stop soundtrack

  userStartAudio();

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    if (loopIsPlaying) {
      walkinparkSFX.stop();
      melodicloopSFX.stop();
      mysteriousSFX.stop();
      acidloopSFX.stop();
      loopIsPlaying = false;
    } else {
      if (state === `rightWorld`) {
      walkinparkSFX.loop();
    }
      else if (state === `leftWorld`) {
      melodicloopSFX.loop();
      }
      else if (state === `topWorld`) {
      mysteriousSFX.loop();
      }
      else if (state === `bottomWorld`) {
      acidloopSFX.loop();
      }
      loopIsPlaying = true;
    }
  }

  // middle top marker - start and stop snow falling

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  ) {
    if (!snowFalling) {
    snowFalling = true;
  } else {
    snowFalling = false;
  }

  }

  // right top marker - start wind blowing

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 205 &&
    mouseY < height / 2 - 195
  )
  if (loopIsPlaying) {
    windSFX.stop();
    loopIsPlaying = false;
  } else {
    windSFX.loop();
    loopIsPlaying = true;
  }

  //middle row
  // left middle row marker -

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    // createCircle(mouseX, mouseY);
  }

  // middle middle row marker - center plane

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  )  {
    if (soundLoop.isPlaying) {
      soundLoop.stop();
    } else {
      // start the loop
      soundLoop.start();
      // subDrop.loop();
      centerAirplane();
    }
  }

  // middle right row marker

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    // createCircle(mouseX, mouseY);
  }

  // bottom row
  // bottom left marker - start sound of walking in snow
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

  // bottom middle marker - play computer sound and ...

  if (
    mouseX >= width / 2 - 5 &&
    mouseX <= width / 2 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {
    // check to see if playing
    if (interval === undefined) {
      // Start interval, calling playRandomNote every 100 milliseconds
      interval = setInterval(playRandomNote, 200);
    } else {
      // stop play
      clearInterval(interval);
      interval = undefined;
    }
  }

  // bottom right marker -

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {

  }
}

// key pressed sounds of sighing a-h
function keyPressed() {
  if (key === "a") {
    sighASFX.play();
  }
  if (key === "b") {
    sighBSFX.play();
  }
  if (key === "c") {
    sighCSFX.play();
  }
  if (key === "d") {
    sighDSFX.play();
  }
  if (key === "e") {
    sighESFX.play();
  }
  if (key === "f") {
    sighFSFX.play();
  }
  if (key === "g") {
    sighGSFX.play();
  }
  if (key === "h") {
    sighHSFX.play();
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

// for airplane
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

  // Move the airplane with the calculated velocities
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
  airplane.x = airplane.x + random(-.5, .5);
  airplane.y = airplane.y + random(-.5, .5);
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
