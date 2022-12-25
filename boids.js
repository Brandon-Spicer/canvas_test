function boids() {
  const canvas = document.getElementById("myCanvas");
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const SIZE = 2;

  // state
  // each boid has location, velocity

  // Number of boids
  const N = 1000;
  const W = canvas.width;
  const H = canvas.height;

  const locations = [];
  const velocities = [];

  // initialize
  for (let i = 0; i < N; i++) {
    const x = Math.floor((Math.random() * W) / SIZE);
    const y = Math.floor((Math.random() * H) / SIZE);
    locations.push([x, y]);

    const dx = 5 - Math.floor(Math.random() * 10);
    const dy = 5 - Math.floor(Math.random() * 10);
    velocities.push([dx, dy]);
  }

  // update
  function updateLocation() {
    for (let i = 0; i < N; i++) {
      locations[i][0] += velocities[i][0];
      locations[i][1] += velocities[i][1];
    }
  }

  // distance function
  function getDistance(vec1, vec2) {
    let x = vec1[0] - vec2[0];
    let y = vec1[1] - vec2[1];
    return Math.sqrt(x * x + y * y);
  }

  const RADIUS = 5;

  // calculate seperation
  // Add up all distance vectors in radius
  // Negate
  // Add to velocity

  function calcSeperation() {
    for (let i = 0; i < N; i++) {
      // sum of distances
      let sum_x = 0;
      let sum_y = 0;

      for (let j = 0; j < N; j++) {
        // if in radius, add to sums
        let dist = getDistance(locations[i], locations[j]);
        if (dist <= RADIUS) {
          sum_x += locations[i][0] - locations[j][0];
          sum_y += locations[i][1] - locations[j][1];
        }
      }

      sum_x = -sum_x / 4;
      sum_y = -sum_y / 4;
      velocities[i][0] += sum_x;
      velocities[i][1] += sum_y;
    }
  }

  // calculate alignment
  // Add up all velocity vectors in radius
  // Normalize
  // Add to velocity
  function calcAlignment() {
    for (let i = 0; i < N; i++) {
      // sum of velocites
      let sum_vx = 0;
      let sum_vy = 0;

      for (let j = 0; j < N; j++) {
        // if in radius, add to sums
        let dist = getDistance(locations[i], locations[j]);
        if (dist <= RADIUS) {
          sum_vx += velocities[j][0];
          sum_vy += velocities[j][1];
        }
      }

      sum_x = -sum_x;
      sum_y = -sum_y;
      velocities[i][0] += sum_x;
      velocities[i][1] += sum_y;
    }
  }

  // calculate cohesion
  // Add up all location vectors in radius
  // Normalize
  // Add to velocity

  // update velocities

  function updateVelocities() {}

  // draw
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      ctx.fillRect(locations[i][0] * SIZE, locations[i][1] * SIZE, SIZE, SIZE);
    }
  }

  // run
  function run() {
    draw();
    updateLocation();
    calcSeperation();
    setTimeout(run, 10);
  }

  run();
}
