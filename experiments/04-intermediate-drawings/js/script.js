/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let angle = 0;
let rectScale = 0;
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
    // createCanvas(500, 500);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(127);

  // push();
  // fill(255, 0, 0);
  // stroke(0, 255, 255);
  // strokeWeight(10);
  // rect(100, 100, 100, 100);
  // pop();
  //
  // push();
  // fill(0, 0, 255);
  // rect(300, 100, 100, 100);
  // pop();

  push();
  fill(255, 0, 0);
  rectMode(CENTER);
  // rotate(radians(45));
  //rotate(PI/4);
  translate(width/2, height/2);
  rotate(angle);
  scale(rectScale);
  rect(0, 0, 100, 100);
  pop();

  angle = angle + .01;
  rectScale = rectScale + .01;
}
