// Rainbow glitter cursor trail
const colors = [
  "#ff5eae", "#ffb86c", "#ffd600", "#69ff7a", "#5ecbff", "#a07afe"
];

let particles = [];

const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 100000;
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function addParticle(x, y) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 2 + 2;
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 1 + 0.5;
  particles.push({
    x, y,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    size,
    color,
    alpha: 1
  });
}

document.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    addParticle(e.clientX, e.clientY);
  }
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();

    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.015;
    p.size *= 0.97;
  });
  particles = particles.filter(p => p.alpha > 0.05 && p.size > 0.5);
  requestAnimationFrame(drawParticles);
}
drawParticles();