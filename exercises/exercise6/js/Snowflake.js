class Snowflake {
  constructor(x, y) {
    ths.x: x,
    this.y: y,
    this.size: 15,
    this.angle: 0, // Facing right to start
    this.speed: 0, // Start out not moving
    this.maxSpeed: 10, // Moving at 5 pixels per frame
    this.acceleration: 0.1, // How much velocity is gained when accelerating
    this.braking: -0.5, // How much velocity is lost when breaking
    this.drag: -0.05 // How much velocity is lost when neither accelerating nor braking
  }

  function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    // Turn LEFT if the LEFT arrow is pressed
    circle.angle -= 0.05;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    // Turn RIGHT if the RIGHT arrow is pressed
    circle.angle += 0.05;
  }

  if (keyIsDown(UP_ARROW)) {
    // Accelerate forward if the UP ARROW is pressed
    circle.speed += circle.acceleration;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
  // Brake if the DOWN ARROW is pressed
  else if (keyIsDown(DOWN_ARROW)) {
    circle.speed += circle.braking;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
  else {
    // Apply drag if neither are pressed
    circle.speed += circle.drag;
    circle.speed = constrain(circle.speed, 0, circle.maxSpeed);
  }
}

function move() {
  // The magical formula!
  let vx = circle.speed * cos(circle.angle);
  let vy = circle.speed * sin(circle.angle);

  // Move the circle with the calculated velocities
  circle.x += vx;
  circle.y += vy;
}

function wrap() {
  if (circle.x > width) {
    circle.x -= width;
  }
  else if (circle.x < 0) {
    circle.x += width;
  }

  if (circle.y > height) {
    circle.y -= height;
  }
  else if (circle.y < 0) {
    circle.y += height;
  }
}

function display() {
  push();
  noStroke();
  // Because we're going to represent rotation, we should translate
  // to the circle's centre
  translate(circle.x, circle.y);
  // Then rotate by its angle
  rotate(circle.angle);

  // display shapes for the snowflake
  triangle(-10, -40, 0, 20, 80, 0);
  fill(174);
  triangle(-40, -20, 0, 20, 80, 0);
  pop();
}
}
