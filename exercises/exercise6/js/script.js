"use strict";

/**************************************************
Exercise 6: Make Some Noise
Jen Poohachoff

This is a prototype of how I plan to use sound in
my final project. I will map sounds to certain areas
that will respond in different ways. I would like to use
computer generated sounds for animated object. For other
sounds the user will decide whether or not they are played.
Some sound will be activated by certain key being pressed, for
example like when you press 'a'
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

  // userStartAudio();
  let intervalInSeconds = 0.2;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  synth = new p5.MonoSynth();
  synthPoly = new p5.PolySynth();
}

function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  // 2nd background that decreases opacity
  // as mouseY moves towards height
  backgroundFade();

  // show + where user can click
  displayMarkers();

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.grow();
    circle.display();
  }
}

// creates effect of canvas getting lighter or darker
// based on mouseY position, 0 = light, height = dark

function backgroundFade() {
  let m = map(mouseY, 0, height, 235, 0);
  fill(bgLight.r, bgLight.g, bgLight.b, m);
  rect(0, 0, width, height); //light sky
}

function displayMarkers() {
  //displays a graph of + markers to show user where to click
  push();
  let m = map(mouseY, 0, height, 235, 0);
  strokeWeight(5);
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

// example of a key pressed sound
function keyPressed() {
  if (key === "a") {
    sigh2SFX.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
