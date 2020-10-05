/**************************************************
Exercise 2: Dodge-em
Jennifer Poohachoff

credits:
Mosquito image - Created by Edward Boatman, Noun Project
Tree code - https://editor.p5js.org/creativecoding/sketches/GlTvrpxn5

avoid the mosquito if you can, by clicking the mouse the day moves towards
night and the mosquitos get larger and faster
**************************************************/

//variables
// var angle = PI / 4;


//preload images
function preload() {

}

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);

}


function draw() {
  background (51);

  var len = 200;
  stroke(255);
  translate(width/2, height);
  branch(len);



}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 10) {
    push();
    rotate(PI / 4);
    branch(len * 0.67);
    pop();
    push();
    rotate(-(PI / 4));
    branch(len * 0.67);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
}



//increase size when img is clicked on and make the background darker blue
function mousePressed() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
