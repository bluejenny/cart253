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
  angleMode(DEGREES)

  //planet
  fill(288, 210, 248);
  ellipse(320, 400, 550, 550);
  filter(BLUR, 10);

  // fill(0, 164, 83);
  // ellipse(90, 120, 125, 125);


  //buildings
  // fill(0);
  // rect(30, 400, 55, 255);
  // rect(100, 350, 85, 355);

  //shadow
  fill(99, 44, 121);
  ellipse(318, 500, 150, 200);
  ellipse(318, 400, 25, 200);
  ellipse(318, 200, 300, 250);
  ellipse(318, 230, 225, 200);
  ellipse(318, 260, 150, 150);
  ellipse(318, 290, 100, 100);
  ellipse(318, 305, 50, 50);
  ellipse(318, 315, 50, 60);


  //body
  fill(163, 148, 124);
  ellipse(320, 500, 150, 200);
  ellipse(320, 400, 25, 200);

  //head
  fill(181, 164, 138);
  ellipse(320, 200, 300, 250);
  ellipse(320, 230, 225, 200);
  ellipse(320, 260, 150, 150);
  ellipse(320, 290, 100, 100);
  ellipse(320, 305, 50, 50);
  ellipse(320, 315, 50, 60);

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

  // fill(255);
  // ellipse(220, 210, 25, 25);
  // ellipse(400, 210, 25, 25);
  //
  // fill(20);
  // ellipse(220, 210, 22, 22);
  // ellipse(400, 210, 22, 22);

  //rotate(25);
  //nostrils
  fill(0);
  ellipse(315, 265, 5, 5);
  ellipse(325, 265, 5, 5);

  //mouth
  stroke(200, 0, 0);
  strokeWeight(3);
  line(310, 295, 335, 295);
  // rectMode(CENTER);
  // rect(320, 290, 90, 25);

}

// draw()
//
// draw nothing
function draw() {

}
