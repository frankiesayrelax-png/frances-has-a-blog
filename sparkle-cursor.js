// Tinkerbell Magic Sparkle (Modernized for GitHub repo use)
// Original: mf2fm web-design, http://www.mf2fm.com/rv

const colour = "random"; // or set to any valid CSS color
const sparkles = 50;

let x = 400, ox = 400, y = 300, oy = 300;
let swide = window.innerWidth, shigh = window.innerHeight;
let sleft = 0, sdown = 0;
const tiny = [], star = [], starv = [], starx = [], stary = [];
const tinyx = [], tinyy = [], tinyv = [];

function createDiv(height, width) {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = height + "px";
  div.style.width = width + "px";
  div.style.overflow = "hidden";
  div.style.pointerEvents = "none";
  return div;
}

function newColour() {
  // GirlNet's random pastel sparkle
  const c = [255, Math.floor(Math.random()*256), Math.floor(Math.random()*128)];
  c.sort(() => 0.5 - Math.random());
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function setScroll() {
  sdown = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  sleft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

function setWidth() {
  swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800;
  shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 600;
}

function sparkle() {
  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;
    for (let c = 0; c < sparkles; c++) if (!starv[c]) {
      star[c].style.left = (starx[c] = x) + "px";
      star[c].style.top = (stary[c] = y + 1) + "px";
      star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
      const colorVal = (colour === "random") ? newColour() : colour;
      star[c].childNodes[0].style.backgroundColor = colorVal;
      star[c].childNodes[1].style.backgroundColor = colorVal;
      star[c].style.visibility = "visible";
      starv[c] = 50;
      break;
    }
  }
  for (let c = 0; c < sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  requestAnimationFrame(sparkle);
}

function update_star(i) {
  if (--starv[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
  if (starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    starx[i] += (i % 5 - 2) / 5;
    if (stary[i] < shigh + sdown) {
      star[i].style.top = stary[i] + "px";
      star[i].style.left = starx[i] + "px";
    } else {
      star[i].style.visibility = "hidden";
      starv[i] = 0;
      return;
    }
  } else {
    tinyv[i] = 50;
    tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
    tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
    tiny[i].style.width = "2px";
    tiny[i].style.height = "2px";
    tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility = "hidden";
    tiny[i].style.visibility = "visible";
  }
}

function update_tiny(i) {
  if (--tinyv[i] === 25) {
    tiny[i].style.width = "1px";
    tiny[i].style.height = "1px";
  }
  if (tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    tinyx[i] += (i % 5 - 2) / 5;
    if (tinyy[i] < shigh + sdown) {
      tiny[i].style.top = tinyy[i] + "px";
      tiny[i].style.left = tinyx[i] + "px";
    } else {
      tiny[i].style.visibility = "hidden";
      tinyv[i] = 0;
      return;
    }
  } else {
    tiny[i].style.visibility = "hidden";
  }
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < sparkles; i++) {
    const t = createDiv(3, 3);
    t.style.visibility = "hidden";
    t.style.zIndex = "999";
    document.body.appendChild(tiny[i] = t);
    starv[i] = 0;
    tinyv[i] = 0;

    const s = createDiv(5, 5);
    s.style.backgroundColor = "transparent";
    s.style.visibility = "hidden";
    s.style.zIndex = "999";
    const rlef = createDiv(1, 5);
    const rdow = createDiv(5, 1);
    s.appendChild(rlef);
    s.appendChild(rdow);
    rlef.style.top = "2px";
    rlef.style.left = "0px";
    rdow.style.top = "0px";
    rdow.style.left = "2px";
    document.body.appendChild(star[i] = s);
  }

  window.addEventListener('mousemove', e => {
    y = e.pageY;
    x = e.pageX;
  });
  window.addEventListener('scroll', setScroll);
  window.addEventListener('resize', setWidth);
  setWidth();
  sparkle();
});
