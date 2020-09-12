/**************************************************
Activity 2: Draw an Alien
Jennifer Poohachoffj

Draw an alien on the canvas.
**************************************************/

// setup()
//
// Draws an Alien
function setup() {
  createCanvas(640, 480);

  background(186, 147, 202);
  noStroke();

  //body
  fill(142, 125, 99);
  ellipse(320, 480, 175, 200);

  //head
  fill(181, 164, 138);
  ellipse(320, 200, 300, 250);
  ellipse(320, 230, 225, 200);
  ellipse(320, 260, 150, 150);
  ellipse(320, 290, 100, 100);
  ellipse(320, 305, 50, 50);
  ellipse(320, 315, 50, 60);

  //eyes
  fill(0);
  //left
  ellipse(260, 210, 85, 40);

  //right
  ellipse(380, 210, 85, 40);

  //nostrils
  ellipse(315, 255, 5, 5);
  ellipse(325, 255, 5, 5);

  //mouth
  stroke(200, 0, 0);
  strokeWeight(3);
  line(300, 295, 340, 295);
  // rectMode(CENTER);
  // rect(320, 290, 90, 25);

}

// draw()
//
// draw nothing
function draw() {

}
