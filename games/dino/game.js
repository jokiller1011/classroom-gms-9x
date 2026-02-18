const c = document.getElementById("game");
const ctx = c.getContext("2d");

let dinoY = 150;
let vel = 0;
let score = 0;

document.addEventListener("keydown", () => {
  if (dinoY === 150) vel = -12;
});

function loop() {
  ctx.clearRect(0,0,600,200);

  vel += 0.6;
  dinoY += vel;
  if (dinoY > 150) dinoY = 150;

  ctx.fillRect(50, dinoY, 20, 20);
  ctx.fillText("Score: " + score++, 10, 20);

  requestAnimationFrame(loop);
}

loop();
