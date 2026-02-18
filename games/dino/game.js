const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

/* ---------------- FAILSAFE RELOAD LIMIT ---------------- */
const MAX_RELOADS = 3;
let reloadCount = Number(sessionStorage.getItem("dinoReloads")) || 0;

/* ---------------- AUTH CHECK ---------------- */
if (!localStorage.getItem("crg9x_current_user")) {
  ctx.font = "18px Arial";
  ctx.fillText("Please log in to play", 200, 100);
  throw new Error("Not logged in");
}

/* ---------------- GAME STATE ---------------- */
let dino = {
  x: 50,
  y: 140,
  w: 24,
  h: 24,
  vy: 0
};

let obstacles = [];
let score = 0;
let gameOver = false;

/* ---------------- INPUT ---------------- */
document.addEventListener("keydown", e => {
  if (e.code === "Space" && dino.y === 140 && !gameOver) {
    dino.vy = -12;
  }

  if (gameOver && e.code === "Enter") {
    safeReload();
  }
});

/* ---------------- OBSTACLES ---------------- */
function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: 150,
    w: 20,
    h: 30
  });
}

setInterval(() => {
  if (!gameOver) spawnObstacle();
}, 1400);

/* ---------------- COLLISION ---------------- */
function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

/* ---------------- SAFE RELOAD ---------------- */
function safeReload() {
  reloadCount++;
  sessionStorage.setItem("dinoReloads", reloadCount);

  if (reloadCount <= MAX_RELOADS) {
    location.reload();
  } else {
    ctx.fillStyle = "red";
    ctx.font = "16px Arial";
    ctx.fillText(
      "Reload limit reached. Refresh manually.",
      160,
      100
    );
  }
}

/* ---------------- GAME LOOP ---------------- */
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ground
  ctx.fillStyle = "#555";
  ctx.fillRect(0, 180, canvas.width, 4);

  /* Dino physics */
  dino.vy += 0.6;
  dino.y += dino.vy;

  if (dino.y > 140) {
    dino.y = 140;
    dino.vy = 0;
  }

  /* Draw dino */
  ctx.fillStyle = "#1a73e8";
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

  /* Obstacles */
  ctx.fillStyle = "#000";
  obstacles.forEach(o => {
    o.x -= 6;
    ctx.fillRect(o.x, o.y, o.w, o.h);

    if (collide(dino, o)) {
      gameOver = true;
    }
  });

  obstacles = obstacles.filter(o => o.x + o.w > 0);

  /* Score */
  score++;
  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.fillText("Score: " + score, 10, 20);

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over", 240, 90);
    ctx.font = "14px Arial";
    ctx.fillText("Press ENTER to restart", 220, 120);
    return;
  }

  requestAnimationFrame(loop);
}

loop();
