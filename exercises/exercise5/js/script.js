"use strict";

/**************************************************
Ex. 5 Juggle in the Dark
by JPoohachoff
**************************************************/
let state = `animation`; // animation, lightsOn, LightsOut

// Our darkroom
let darkRoom = {
  // An array to store the individual eyes
  eyes: [],
  // How many eyes in the dark
  numEyes: 13,
  // An array to store the individual lights
  lights1: [],
  lights2: [],
  //how many lights in the dark
  numLights: 40,
  countLights : 0,
  // The color of the background
  bckgrnd: {
    r: 10,
    g: 10,
    b: 30
  }
};


// setup() creates the canvas and the eyes in the dark
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create our eye by counting up to the number of eyes
  for (let i = 0; i < darkRoom.numEyes; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 60);
    let irisColor = {
      r: random(0, 200),
      g: random(75, 200),
      b: random(75, 200),
    };
    let eyeCount = darkRoom.numEyes;
    // NEW! Create a new eye
    let eye = new Eye(x, y, size, irisColor, eyeCount);
    // Add the eye to the array of eyes
    darkRoom.eyes.push(eye);
  }

  // create the lights
  for (let i = 0; i < darkRoom.numLights; i++) {
    let light = new Light1(random(0, width), random(0, height));
    darkRoom.lights1.push(light);
  }

  for (let i = 0; i < darkRoom.numLights; i++) {
    let light = new Light2(random(0, width), random(0, height));
    darkRoom.lights2.push(light);
  }
}

// draw()
// Displays our eyes
function draw() {

  if (state === `animation`) {
  animation();
  }
  else if (state === `lightsOn`) {
    lightsOn();
  }
  else if (state === `lightsOff`) {
    lightsOff();
  }

}

function animation() {
  // Display the background
  background(darkRoom.bckgrnd.r, darkRoom.bckgrnd.g, darkRoom.bckgrnd.b);

  // Loop through all the eyes in the array and display them
  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    if (eye.open) {
    eye.display();
    }
  }

  for (let i = 0; i < darkRoom.lights1.length; i++) {
    let light = darkRoom.lights1[i];
    if (light.on) {
      light.grow();
      light.move();
      light.display();
    }
  }

  for (let i = 0; i < darkRoom.lights1.length; i++) {
    let light = darkRoom.lights1[i];
    if (light.size >= light.maxSize) {
      state = `lightsOn`;
    }
  }


  for (let i = 0; i < darkRoom.lights2.length; i++) {
    let light = darkRoom.lights2[i];
    if (light.on) {
      light.grow();
      light.move();
      light.display();
    }
  }

  checkClosedEnding();
}

function checkClosedEnding() {
  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    if (eye.open) {
      return;
    }
  }

  state = `lightsOff`;
}

function lightsOn() {
    background(darkRoom.bckgrnd.r, darkRoom.bckgrnd.g, darkRoom.bckgrnd.b);

    for (let i = 0; i < darkRoom.lights1.length; i++) {
      let light = darkRoom.lights1[i];
      light.on = true;
      light.display();
      noLoop();
    }

    for (let i = 0; i < darkRoom.lights2.length; i++) {
      let light = darkRoom.lights2[i];
      if (light.on) {
        light.display();
      }
    }

    textAlign(CENTER, CENTER);
    fill(darkRoom.bckgrnd.r, darkRoom.bckgrnd.g, darkRoom.bckgrnd.b);
    textSize(62);
    textFont("Baloo");
    text('PARTY ON!', width/2, height/2-50);
}

function lightsOff() {
  background(darkRoom.bckgrnd.r, darkRoom.bckgrnd.g, darkRoom.bckgrnd.b);
  textAlign(CENTER, CENTER);
  fill(220);
  textSize(62);
  textFont("Baloo");
  text('LIGHTS OUT.', width/2, height/2-50);
}

function mousePressed() {
  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    eye.mousePressed();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
