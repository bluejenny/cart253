/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
// function setup() {
//   createCanvas(500, 500);
//
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(mouseX, mouseY, mouseY / 2);
  rectMode(CENTER);
  rect(mouseX, mouseY, mouseX, mouseY);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
