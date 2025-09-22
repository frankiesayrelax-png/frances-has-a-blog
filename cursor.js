// Rainbow cursor effect inspired by smallweb.site/girlnet/inspire
const colors = [
  "rgb(137, 118, 255)",
  "rgb(143, 255, 219)",
  "rgb(255, 65, 3)",
  "rgb(255, 255, 3)",
  "rgb(255, 3, 255)",
  "rgb(3, 255, 252)",
  "rgb(255, 157, 3)"
];

const trailLength = 20;
let mouseTrail = [];
let i = 0;

document.body.style.cursor = "none";

document.addEventListener("mousemove", function (e) {
  // Create the dot
  const dot = document.createElement("div");
  dot.className = "rainbow-dot";
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  dot.style.background = colors[i % colors.length];
  i++;

  document.body.appendChild(dot);
  mouseTrail.push(dot);

  // Remove oldest dot if we have too many
  if (mouseTrail.length > trailLength) {
    let old = mouseTrail.shift();
    if (old) old.remove();
  }

  // Fade out the dot
  setTimeout(() => {
    dot.style.opacity = 0;
  }, 200);

  // Remove from DOM after fade
  setTimeout(() => {
    if (dot.parentNode) dot.parentNode.removeChild(dot);
  }, 600);
});