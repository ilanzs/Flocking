class Boid {
  constructor(x, y, vision) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.r = 5;
    this.maxSpeed = 4;
    this.maxForce = 0.5;
  
  }

  edges = () => {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    
  }

  align = (boids) => {
    let vision = 25;
    let total = 0;
    let average = createVector(0, 0);
    for (let i = 0; i < boids.length; i++) {
      if (dist(this.position.x, this.position.y, boids[i].position.x, boids[i].position.y) <= vision) {
        average.add(boids[i].velocity);
        total++;
      }
    }
    if (total > 0) {
      average.div(total);
      average.setMag(this.maxSpeed);
      average.sub(this.velocity);
      average.limit(this.maxForce);
    }
    return average;
  }

  cohesion = (boids) => {
    let vision = 50;
    let total = 0;
    let average = createVector(0, 0);
    for (let i = 0; i < boids.length; i++) {
      if (dist(this.position.x, this.position.y, boids[i].position.x, boids[i].position.y) <= vision) {
        average.add(boids[i].position);
        total++;
      }
    }
    if (total > 0) {
      average.div(total);
      average.sub(this.position);
      average.setMag(this.maxSpeed);
      average.limit(this.maxForce);
    }
    return average;
  }

  seperation = (boids) => {
    let vision = 25;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < vision) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      // steering.limit(this.maxForce);
      steering.div(6);
    }
    return steering;
  }

  flock = (boids) => {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.seperation(boids);
    this.acceleration.add(separation);
    this.acceleration.add(cohesion);  
    this.acceleration.add(alignment);
  
  }

  update = () => {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  show = () => {
    stroke(255);
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + PI / 2;

    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();

  }
  
}