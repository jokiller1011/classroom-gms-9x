// login lock
if (!localStorage.getItem("crg9x_current_user")) {
  location.href = "../../login.html";
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

let dino = { x: 50, y: 140, w: 24, h: 24, vy: 0 };
let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.code === "Space" && dino.y >= 140) {
    dino.vy = -12;
  }
  if (gameOver && e.code === "Enter") location.reload();
});

function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: 156,
    w: 20,
    h: 30
  });
}

setInterval(spawnObstacle, 1300);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ground
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 180, canvas.width, 4);

  // dino physics
  dino.vy += 0.6;
  dino.y += dino.vy;
  if (dino.y > 140) {
    dino.y = 140;
    dino.vy = 0;
  }

  // draw dino
  ctx.fillStyle = "#1a73e8";
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

  // obstacles
  ctx.fillStyle = "#000";
  obstacles.forEach(o => {
    o.x -= 5;
    ctx.fillRect(o.x, o.y, o.w, o.h);

    // collision
    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      gameOver = true;
    }
  });

  obstacles = obstacles.filter(o => o.x + o.w > 0);

  // score
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score++, 10, 20);

  if (gameOver) {
    ctx.fillText("GAME OVER — Press Enter", 220, 100);
    return;
  }

  requestAnimationFrame(loop);
}

loop();
