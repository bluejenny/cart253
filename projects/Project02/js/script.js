"use strict";

/**************************************************
Exercise 6: Make Some Noise
Jen Poohachoff

This is a prototype of how I plan to use sound in
my final project. I will map sounds to certain areas
that will respond in different ways. I would like to use
computer generated sounds for animated object. For other
sounds the user will decide whether or not they are played.
Some sound will be activated by a certain key being pressed,
for example like when you press 'a'
**************************************************/

//dark bckgrnd behind simulation
let bgDark = {
  r: 48,
  g: 65,
  b: 79,
};

//lighter bacground, opacity fades as mouseY moves down
let bgLight = {
  r: 202,
  g: 225,
  b: 244,
};

// the animated circles
let circles = [];

let circle = {
  x: 300,
  y: 300,
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
let notePattern = [80, 82, 84, 87, 89, 92];

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

  //set airplane to center of screen
  circle.x = width/2-40;
  circle.y = height/2-10;

  // userStartAudio();
  let intervalInSeconds = 0.2;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  synth = new p5.MonoSynth();
  synthPoly = new p5.PolySynth();

  //set mouse to center of screen
  resetMouse();
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  // 2nd background that decreases opacity
  // as mouseY moves towards height
  backgroundFade();

  displayLandscape();

  push();
  fill(235);
  rect(0, 0, width, height);
  rectMode(CENTER);
  noFill();
  strokeWeight(1);
  stroke(77, 87, 99);
  // rect(mouseX, height/2, width-100, height-20);
  line(0, 0, mouseX-width/3, 100);
  line(width, 0, mouseX+width/3, 100);

  line(0, height-50, mouseX-width/3, height-150);
  line(width, height-50, mouseX+width/3, height-150);

  line(mouseX-width/3, 100, mouseX+width/3, 100);
  line(mouseX-width/3, height-150, mouseX+width/3, height-150);

  line(mouseX-width/3, 100, mouseX-width/3, height-150);
  line(mouseX+width/3, 100, mouseX+width/3, height-150);
  // rect(mouseX, height/2, width-width/2, height-height/2);
  pop();

  push();
  handleInput();
  move();
  wrap();
  display();
  pop()

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

// creates effect of canvas getting lighter or darker
// based on mouseY position, 0 = light, height = dark

function backgroundFade() {
  let m = map(mouseY, 0, height, 235, 0);
  fill(bgLight.r, bgLight.g, bgLight.b, m);
  rect(0, 0, width, height); //light sky
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

  // fill(77, 87, 99);
  // triangle(mouseX-10, 2*height/3, 0, height/2+55, 0, height);
  // triangle(mouseX+10, 2*height/3, width, height/2+55, width, height);

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
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    // Turn LEFT if the LEFT arrow is pressed
    circle.angle -= 0.05;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    // Turn RIGHT if the RIGHT arrow is pressed
    circle.angle += 0.05;
  }

  if (keyIsDown(UP_ARROW)) {
    // Accelerate forward if the UP ARROW is pressed
    circle.speed += circle.acceleration;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
  // Brake if the DOWN ARROW is pressed
  else if (keyIsDown(DOWN_ARROW)) {
    circle.speed += circle.braking;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
  else {
    // Apply drag if neither are pressed
    circle.speed += circle.drag;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
}

function move() {
  // The magical formula!
  let vx = circle.speed * cos(circle.angle);
  let vy = circle.speed * sin(circle.angle);

  // Move the circle with the calculated velocities
  circle.x += vx;
  circle.y += vy;
}

function wrap() {
  if (circle.x > width) {
    circle.x -= width;
    displayLandscape();
  }
  else if (circle.x < 0) {
    circle.x += width;
  }

  if (circle.y > height) {
    circle.y -= height;
  }
  else if (circle.y < 0) {
    circle.y += height;
  }
}

function display() {
  push();
  noStroke();
  // Because we're going to represent rotation, we should translate
  // to the circle's centre
  translate(circle.x, circle.y);
  // Then rotate by its angle
  rotate(circle.angle);

  fill(150);
  triangle(-20, -20, 0, 0, 80, -30);
  fill(175);
  triangle(30, 30, 0, 0, 80, -30);
  fill(135);
  triangle(0, 20, 0, 0, 15, 15);
  // Draw the circle (at 0,0 because we translated)
  // fill(200, 40, 100);
  // ellipse(75, 0, circle.size);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
