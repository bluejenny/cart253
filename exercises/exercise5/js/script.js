"use strict";

/**************************************************
Ex. 5 Juggle in the Dark
by JPoohachoff
**************************************************/

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
    // NEW! Create a new eye
    let eye = new Eye(x, y, size, irisColor);
    // Add the eye to the array of eyes
    darkRoom.eyes.push(eye);
  }

  // NEW! Sort the array using the sortByY() function
  // darkRoom.eyes.sort(sortByY);

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

// sortByY() takes two eyes as parameters to compare
// It should return a negative number if flower1 should come
// BEFORE flower2 in the array, a positive number if flower1 should
// come AFTER flower2 in the array, and 0 if there they have the
// same priority
// function sortByY(flower1, flower2) {
//   // We achieve the above by subtracting flower2's y position
//   // from flower1's! How elegant!
//   return flower1.y - flower2.y;
// }

// draw()
// Displays our eyes
function draw() {
  // Display the background
  background(darkRoom.bckgrnd.r, darkRoom.bckgrnd.g, darkRoom.bckgrnd.b);

  // Loop through all the eyes in the array and display them
  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    if (eye.alive) {
    eye.grow();
    eye.display();
    }
  }

  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    if (!eye.alive) {
    eye.grow();
    eye.display();
    }
  }

  for (let i = 0; i < darkRoom.lights1.length; i++) {
    let light = darkRoom.lights1[i];
    if (light.on) {
      light.grow();
      light.move();
      light.display();

      // for (let j = 0; j < darkRoom.eyes.length; j++) {
      //   let eye = darkRoom.eyes[j];
      //   if (eye.alive) {
      //   light.tryToPollinate(eye);
      //   }
      // }
    }
  }

  for (let i = 0; i < darkRoom.lights2.length; i++) {
    let light = darkRoom.lights2[i];
    if (light.on) {
      light.grow();
      light.move();
      light.display();

      // for (let j = 0; j < darkRoom.eyes.length; j++) {
      //   let eye = darkRoom.eyes[j];
      //   if (eye.alive) {
      //   light.tryToPollinate(eye);
      //   }
      // }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < darkRoom.eyes.length; i++) {
    let eye = darkRoom.eyes[i];
    eye.mousePressed();
  }
  for (let i = 0; i < darkRoom.lights1.length; i++) {
    let light = darkRoom.lights1[i];
    light.mousePressed();
  }
  for (let i = 0; i < darkRoom.lights2.length; i++) {
    let light = darkRoom.lights2[i];
    light.mousePressed();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
