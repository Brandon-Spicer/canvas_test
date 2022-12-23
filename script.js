function gameOfLife() {
  const canvas = document.getElementById("myCanvas");
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  // state
  H = 200;
  W = 200;
  const size = 2;
  const state = Array(H);
  const nextState = Array(H);

  // initialize
  for (let i = 0; i < H; i++) {
    state[i] = Array(W);
    nextState[i] = Array(W);
    for (let j = 0; j < W; j++) {
      const r = Math.floor(Math.random() * 2);
      state[i][j] = r;
      nextState[i][j] = r;
    }
  }

  const survival = [2, 3];
  const birth = [3];

  // update
  function update() {
    // Calculate nextState
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        let numLiveNeighbors = 0;
        for (let k = -1; k < 2; k++) {
          for (let l = -1; l < 2; l++) {
            if (!(k == 0 && l == 0)) {
              let y = (i + l) % H;
              let x = (j + k) % W;
              x = x < 0 ? W + x : x;
              y = y < 0 ? H + y : y;
              numLiveNeighbors += state[y][x];
            }
          }
        }
        if (state[i][j] == 1) {
          nextState[i][j] = survival.includes(numLiveNeighbors) ? 1 : 0;
        } else {
          nextState[i][j] = birth.includes(numLiveNeighbors) ? 1 : 0;
        }
      }
    }

    // Update state
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        state[i][j] = nextState[i][j];
      }
    }
  }

  // draw
  function draw() {
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        if (state[i][j] == 1) {
          ctx.fillRect(j * size, i * size, size, size);
        } else {
          ctx.clearRect(j * size, i * size, size, size);
        }
      }
    }
  }

  function run() {
    update();
    draw();
    setTimeout(run, 100);
  }

  run();
}

// Make

// Write cellularAutomaton class with basic functionality
// initialize
// update
// draw

// Node
// val
// nextVal
// neighbors
