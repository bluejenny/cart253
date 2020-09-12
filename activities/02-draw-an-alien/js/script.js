/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(640, 480);

  background(255, 100, 100);
  noStroke();

  //body
  fill(127);
  ellipse(320, 480, 300, 200);

  //head
  fill(100);
  ellipse(320, 240, 250, 400);

  //eyes
  fill(0);
  ellipse(250, 240, 80, 250);
  ellipse(390, 240, 80, 250);
  //nostrils
  ellipse(300, 350, 10, 10);
  ellipse(340, 350, 10, 10);

  //mouth
  stroke(200, 0, 0);
  strokeWeight(5);
  rectMode(CENTER);
  rect(320, 390, 90, 25);

}

// draw()
//
// Description of draw() goes here.
function draw() {

}
