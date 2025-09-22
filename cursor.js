// Rainbow "+" cursor effect

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
let colorIndex = 0;

// KEEP the default cursor, do NOT hide it

document.addEventListener("mousemove", function (e) {
  // Create the "+" element
  const plus = document.createElement("div");
  plus.className = "rainbow-plus";
  plus.textContent = "+";
  plus.style.left = e.clientX + "px";
  plus.style.top = e.clientY + "px";
  plus.style.color = colors[colorIndex % colors.length];
  colorIndex++;

  document.body.appendChild(plus);
  mouseTrail.push(plus);

  // Remove oldest "+" if we have too many
  if (mouseTrail.length > trailLength) {
    let old = mouseTrail.shift();
    if (old) old.remove();
  }

  // Fade out the "+"
  setTimeout(() => {
    plus.style.opacity = 0;
  }, 200);

  // Remove from DOM after fade
  setTimeout(() => {
    if (plus.parentNode) plus.parentNode.removeChild(plus);
  }, 600);
});
