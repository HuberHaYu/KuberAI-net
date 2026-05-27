const root = document.documentElement;
const title = document.getElementById("heroTitle");
const modes = ["auto", "light", "dark"];

function getSavedTheme() {
  const saved = localStorage.getItem("kuberai-theme");
  return modes.includes(saved) ? saved : "auto";
}

function applyTheme(mode) {
  if (mode === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", mode);
  }

  localStorage.setItem("kuberai-theme", mode);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateTitlePosition() {
  if (!title) return;

  const progress = clamp(window.scrollY / 520, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 3);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const endRight = 50;
  const endTop = 30;

  title.style.transform = "translate(-50%, -50%) scale(1)";
  const rect = title.getBoundingClientRect();

  const startX = vw / 2;
  const startY = vh / 2;

  const scale = 1 - 0.72 * eased;
  const scaledWidth = rect.width * scale;
  const scaledHeight = rect.height * scale;

  const endX = vw - endRight - scaledWidth / 2;
  const endY = endTop + scaledHeight / 2;

  const x = startX + (endX - startX) * eased;
  const y = startY + (endY - startY) * eased;

  title.style.left = `${x}px`;
  title.style.top = `${y}px`;
  title.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

applyTheme(getSavedTheme());
updateTitlePosition();

window.addEventListener("scroll", updateTitlePosition, { passive: true });
window.addEventListener("resize", updateTitlePosition);