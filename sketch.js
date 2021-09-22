let boids = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(51);
  for (let boid of boids) {
    boid.edges();
    boid.flock(boids)
    boid.update();
    boid.show();
  }
}