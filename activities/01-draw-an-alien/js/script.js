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
  angleMode(DEGREES);


  //planet
  squareColor = color(288, 210, 248);
  squareColor.setAlpha(128 + 128 * sin(millis() / 1000));
  fill(squareColor);
  ellipse(320, 280, 525, 525);

  //shadow
  fill(99, 44, 121);
  // ellipse(337, 525, 175, 200);
  ellipse(310, 202, 300, 230);
  //ellipse(317, 231, 225, 200);
  //ellipse(317, 261, 150, 150);
  // ellipse(317, 291, 100, 100);
  // ellipse(340, 400, 30, 200);

  filter(BLUR, 5);

  //moon
  // fill(240);
  squareColor = color(288, 210, 248);
  squareColor.setAlpha(128 + 128 * sin(millis() / 1000));
  fill(squareColor);
  ellipse(90, 120, 140, 140);

  fill(80, 0, 255);
  rectMode(CENTER);
  rect(60, 90, 10, 10);
  rect(120, 90, 10, 10);

  rect(70, 100, 10, 10);
  rect(110, 100, 10, 10);

  rect(60, 110, 10, 10);
  rect(70, 110, 10, 10);
  rect(80, 110, 10, 10);
  rect(90, 110, 10, 10);
  rect(100, 110, 10, 10);
  rect(110, 110, 10, 10);
  rect(120, 110, 10, 10);

  rect(50, 120, 10, 10);
  rect(60, 120, 10, 10);
  rect(80, 120, 10, 10);
  rect(90, 120, 10, 10);
  rect(100, 120, 10, 10);
  rect(120, 120, 10, 10);
  rect(130, 120, 10, 10);

  rect(40, 130, 10, 10);
  rect(50, 130, 10, 10);
  rect(60, 130, 10, 10);
  rect(70, 130, 10, 10);
  rect(80, 130, 10, 10);
  rect(90, 130, 10, 10);
  rect(100, 130, 10, 10);
  rect(110, 130, 10, 10);
  rect(120, 130, 10, 10);
  rect(130, 130, 10, 10);
  rect(140, 130, 10, 10);

  rect(40, 140, 10, 10);
  rect(60, 140, 10, 10);
  rect(70, 140, 10, 10);
  rect(80, 140, 10, 10);
  rect(90, 140, 10, 10);
  rect(100, 140, 10, 10);
  rect(110, 140, 10, 10);
  rect(120, 140, 10, 10);
  rect(140, 140, 10, 10);

  rect(40, 150, 10, 10);
  rect(60, 150, 10, 10);
  rect(120, 150, 10, 10);
  rect(140, 150, 10, 10);

  rect(70, 160, 10, 10);
  rect(110, 160, 10, 10);

  rect(80, 160, 10, 10);
  rect(100, 160, 10, 10);


  //body
  fill(173, 158, 124);
  ellipse(320, 500, 150, 200);
  rect(320, 400, 24, 200);

  //head
  fill(181, 164, 138);
  ellipse(320, 200, 300, 250);
  ellipse(320, 230, 225, 200);
  ellipse(320, 260, 150, 150);
  ellipse(320, 290, 100, 100);

  //eyes
  //left
  fill(0);
  rotate(26);
  ellipseMode(CORNER);
  ellipse(280, 80, 95, 50);
  rotate(-26);

  //right
  fill(0);
  rotate(-26);
  ellipse(207, 363, 95, 50);
  rotate(26);

  //eyes white
  fill(255);
  ellipse(220, 211, 25, 25);
  ellipse(400, 212, 25, 25);

  //eyes pupil
  fill(0);
  ellipse(220, 212, 30, 30);
  ellipse(396, 213, 30, 30);

  //nostrils
  fill(0);
  ellipse(315, 265, 5, 5);
  ellipse(325, 265, 5, 5);

  //mouth
  stroke(200, 0, 0);
  strokeWeight(3);
  line(310, 295, 335, 295);

}

// draw()
//
// draw nothing
function draw() {

}
