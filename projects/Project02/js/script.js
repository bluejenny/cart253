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

let state = `room`; // states are room, leftWorld, topWorld, rightWorld, bottomWorld

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

// from example https://editor.p5js.org/FugQueue/sketches/saW0wiHMy
let confettis = [];
let confettiFalling = false;


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

// C-minor
let notes3 = [60, 62, 64, 65, 67, 69, 71, 72]

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

let clockFont;
let clockOn = false;

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

  clockFont = loadFont(`assets/digital-7.ttf`);

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

function clock() {
  push();
  noStroke();
  fill(255, 100);
  textFont(clockFont);
  textAlign(CENTER, CENTER);
  textSize(width/4.25);
  let Hour = hour();
  let min = minute();
  let secs = second()
  let noon = Hour >= 12? " PM" : " AM"
  if(min < 10)
    min = "0"+min
  Hour%=12
  text(Hour+":"+min+":"+secs+noon, width/2, height/2);
  pop();
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
    // clock();
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
  displayMarkers();
  }

  if (clockOn === true) {
  clock();
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

function drawController(x, y) {
  push();
  noStroke();
  let controlColor = color(50, 50, 50);
  controlColor.setAlpha(50 + 50 * sin(millis() / 1000));
  fill(controlColor);
  //bottom
  triangle(x - 8, y + 70, x + 8, y + 70, x, y + 80);
  //top
  triangle(x - 8, y - 70, x + 8, y - 70, x, y - 80);
  //left
  triangle(x - 75, y - 8, x - 75, y + 8, x - 85, y);
  //right
  triangle(x + 75, y - 8, x + 75, y + 8, x + 85, y);
  pop();
}

function room() {
  //reset background color
  bgDark.r = 48;
  bgDark.g = 65;
  bgDark.b = 79;

  //stop all sound and graphics
  clearInterval(interval);
  interval = undefined;
  snowSFX.stop();
  soundLoop.stop();
  windSFX.stop();
  walkinparkSFX.stop();
  melodicloopSFX.stop();
  mysteriousSFX.stop();
  acidloopSFX.stop();
  loopIsPlaying = false;
  snowFalling = false;
  confettiFalling = false;

  drawRoom();
  drawController(width / 2, height / 2);
}

function leftWorld() {
  backgroundFade(leftWorldBckgrnd.r, leftWorldBckgrnd.g, leftWorldBckgrnd.b);
  drawSun();
  displayLandscapeLeft();
}

function rightWorld() {
  backgroundFade(245, 225, 244);
  drawSun();
  displayLandscape();
}

function topWorld() {
  backgroundFade(245, 225, 244);
  drawSun();
  displayLandscape();
}

function bottomWorld() {
  backgroundFade(245, 225, 244);
  drawSun();
  displayLandscape();
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

function checkConfettiFalling() {
  if (confettiFalling) {
  fallingConfetti();
  }
}

// redraws landscape but upside down
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
  fill(87, 97, 109, opacity);
  triangle(mouseX + 30, (landscapeY) / 3, 0, landscapeY / 3 - 30, 0, landscapeY - 200);
  triangle(mouseX - 30, (landscapeY) / 3, width, landscapeY / 3 - 50, width, landscapeY - 200);

  fill(77, 87, 99, opacity);
  triangle(mouseX - 10, (landscapeY) / 3, 0, landscapeY / 3, 0, landscapeY-300);
  triangle(mouseX + 10, (landscapeY) / 3, width, landscapeY / 3, width, landscapeY-300);

  //land

  fill(142, 163, 180, 220);
  rect(0, 0, width, (landscapeY) / 3);

  checkSnowFalling();
  checkConfettiFalling();
  pop();
}

function displayLandscape() {
  push();
  noStroke();

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

  checkSnowFalling();
  checkConfettiFalling();
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

// function checkMarkers() {
//
// }

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth.play(note, 0.025, timeFromNow);
}

// playRandomNote() plays a random note
function playRandomNote() {
  // Chose a random note
  let note = random(notesD);
  // Play it
  synth.play(note, 1, 0, 1);
}


function createCircle1(x, y) {
  let note = random(notesD);
  let circle = new Circle1(x, y, note);
  circles.push(circle);
}

function createCircle2(x, y) {
  let note = random(notesF);
  let circle = new Circle2(x, y, note);
  circles.push(circle);
}

function createCircle3(x, y) {
  let note = random(notes3);
  let circle = new Circle3(x, y, note);
  circles.push(circle);
}

function fallingConfetti() {

  push();
  noStroke();
  // fill(240, 100);

  // draw falling snow
   let t = frameCount / 60; // update time

   //create a random number of snowflakes each frame
   for (let i = 0; i < random(5); i++) {
     confettis.push(new confetti()); // append snowflake object
   }

   //loop through snowflakes with a for..of loop
    for (let confetti of confettis) {
      confetti.update(t); // update snowflake position
      confetti.display(); // draw snowflake
    }

    pop();
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

function confetti() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 10);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));
  this.color = color(random(255), random(255), random(255));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = confettis.indexOf(this);
      confettis.splice(index, 1);
    }
  };

  this.display = function() {
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  };
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

function changeBckgrnd() {
  bgDark.r = random(0, 255);
  bgDark.g = random(0, 255);
  bgDark.b = random(0, 255);
}

function mousePressed() {
  if (state !== `room`) {
    if (state === `rightWorld`) {
      createCircle1(mouseX, mouseY);
    } else if (state === `topWorld`) {
      createCircle2(mouseX, mouseY);
    } else if (state === `bottomWorld`) {
      createCircle3(mouseX, mouseY);
    } else {
      let randomValue = random();
      if (randomValue < .33) {
        createCircle1(mouseX, mouseY);
      } else if (randomValue > .66) {
        createCircle2(mouseX, mouseY);
        }
        else {
        createCircle3(mouseX, mouseY);
        }
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
    sighGSFX.play();
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
  ) {
  if (loopIsPlaying) {
    windSFX.stop();
    loopIsPlaying = false;
  } else {
    windSFX.loop();
    loopIsPlaying = true;
  }
  }

  //middle row
  // left middle row marker -

  if (
    mouseX >= width / 6 - 5 &&
    mouseX <= width / 6 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    sighBSFX.play();
    if (state !== `bottomWorld`) {
    createCircle3(mouseX, mouseY);
    }
    else {
      createCircle1(mouseX, mouseY);
      createCircle2(mouseX, mouseY);
    }
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
    if (state === `bottomWorld`) {
      createCircle1(mouseX, mouseY);
    }
  }

  // middle right row marker

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 - 5 &&
    mouseY < height / 2 + 5
  ) {
    changeBckgrnd();
    sighASFX.play();
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
      confettiFalling = true;
    } else {
      // stop play
      clearInterval(interval);
      interval = undefined;
      confettiFalling = false;
    }
  }

  // bottom right marker -

  if (
    mouseX >= (width / 6) * 5 - 5 &&
    mouseX <= (width / 6) * 5 + 5 &&
    mouseY > height / 2 + 195 &&
    mouseY < height / 2 + 205
  ) {
    if (clockOn === true) {
      clockOn = false
    } else {
      clockOn = true
      sighHSFX.play();
    }
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
  triangle(-15, -15, 0, 0, 70, -30);
  fill(175);
  triangle(25, 25, 0, 0, 70, -30);
  fill(145);
  triangle(3, 20, 0, 0, 15, 15);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
