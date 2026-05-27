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

  const startX = 50;
  const startY = 50;
  const endX = 100;
  const endY = 0;

  const x = startX + (endX - startX) * eased;
  const y = startY + (endY - startY) * eased;

  const scale = 1 - 0.72 * eased;
  const translateX = -50 + 50 * eased;
  const translateY = -50 + 50 * eased;

  title.style.left = `${x}%`;
  title.style.top = `${y}%`;
  title.style.transform = `translate(calc(${translateX}% - ${24 * eased}px), calc(${translateY}% + ${24 * eased}px)) scale(${scale})`;
}

applyTheme(getSavedTheme());
updateTitlePosition();

window.addEventListener("scroll", updateTitlePosition, { passive: true });
window.addEventListener("resize", updateTitlePosition);