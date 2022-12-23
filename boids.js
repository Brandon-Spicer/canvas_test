function boids() {
  const canvas = document.getElementById("myCanvas");
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  // state
  // each boid has location, velocity

  // Number of boids
  const N = 10000;
  const W = canvas.width;
  const H = canvas.height;

  const locations = [];
  const velocities = [];

  // initialize
  for (let i = 0; i < N; i++) {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
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
  // update location with velocity
  // calculate new velocities
  // update velocities

  // draw
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      ctx.fillRect(locations[i][0], locations[i][1], 1, 1);
    }
  }

  // run
  function run() {
    draw();
    updateLocation();
    setTimeout(run, 10);
  }

  run();
}
