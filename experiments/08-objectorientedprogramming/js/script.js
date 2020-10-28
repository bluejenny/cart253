"use strict";

/**************************************************
08 - Object Oriented Programming
with Pippin Barr
**************************************************/

// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 50,
  // An array to store the individual bees
  bees: [],
  //how many bees in the garden
  numBees: 7,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = (random(50, 100));
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255),
    };
    // NEW! Create a new flower
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }

  // NEW! Sort the array using the sortByY() function
  garden.flowers.sort(sortByY);

  // create the bees
  for (let i = 0; i < garden.numBees; i++) {
    let bee = new Bee(random(0, width), random(0, height));
    garden.bees.push(bee);
  }
}

// sortByY() takes two flowers as parameters to compare
// It should return a negative number if flower1 should come
// BEFORE flower2 in the array, a positive number if flower1 should
// come AFTER flower2 in the array, and 0 if there they have the
// same priority
function sortByY(flower1, flower2) {
  // We achieve the above by subtracting flower2's y position
  // from flower1's! How elegant!
  return flower1.y - flower2.y;
}

// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
    flower.shrink();
    flower.display();
    }
  }

  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive) {
      bee.shrink();
      bee.move();
      bee.display();

      for (let j = 0; j < garden.flowers.length; j++) {
        let flower = garden.flowers[j];
        if (flower.alive) {
        bee.tryToPollinate(flower);
        }
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    flower.mousePressed();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
