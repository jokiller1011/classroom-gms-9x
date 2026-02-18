// login lock
if (!localStorage.getItem("crg9x_current_user")) {
  location.href = "../../login.html";
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, w: 20, h: 20, vy: 0 };
let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.code === "Space" && dino.y === 150) {
    dino.vy = -12;
  }
  if (gameOver && e.code === "Enter") location.reload();
});

function spawnObstacle() {
  obstacles.push({ x: 600, y: 160, w: 20, h: 20 });
}

setInterval(spawnObstacle, 1500);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dino physics
  dino.vy += 0.6;
  dino.y += dino.vy;
  if (dino.y > 150) dino.y = 150;

  // Draw dino
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

  // Obstacles
  obstacles.forEach(o => {
    o.x -= 5;
    ctx.fillRect(o.x, o.y, o.w, o.h);

    // Collision
    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      gameOver = true;
    }
  });

  obstacles = obstacles.filter(o => o.x > -20);

  // Score
  ctx.fillText("Score: " + score++, 10, 20);

  if (gameOver) {
    ctx.fillText("GAME OVER — Press Enter", 200, 100);
    return;
  }

  requestAnimationFrame(loop);
}

loop();
