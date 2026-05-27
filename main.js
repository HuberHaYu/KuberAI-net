const root = document.documentElement;
const titleWrap = document.getElementById("titleWrap");
const summaryWrap = document.getElementById("summaryWrap");
const summaryText = document.getElementById("summaryText");
const nextSummary = document.getElementById("nextSummary");

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

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function updateHero() {
  if (!titleWrap || !summaryWrap || !summaryText || !nextSummary) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const stageDistance = vh;
  const progress = clamp(window.scrollY / stageDistance, 0, 1);
  const eased = easeOutCubic(progress);

  const endRight = 50;
  const endTop = 30;

  titleWrap.style.left = "50%";
  titleWrap.style.top = "50%";
  titleWrap.style.transform = "translate(-50%, -50%) scale(1)";

  const titleRect = titleWrap.getBoundingClientRect();
  const scale = 1 - 0.68 * eased;

  const scaledWidth = titleRect.width * scale;
  const scaledHeight = titleRect.height * scale;

  const startX = vw / 2;
  const startY = vh / 2;
  const endX = vw - endRight - scaledWidth / 2;
  const endY = endTop + scaledHeight / 2;

  const titleX = startX + (endX - startX) * eased;
  const titleY = startY + (endY - startY) * eased;

  titleWrap.style.left = `${titleX}px`;
  titleWrap.style.top = `${titleY}px`;
  titleWrap.style.transform = `translate(-50%, -50%) scale(${scale})`;

  const startSummaryX = vw / 2;
  const startSummaryY = vh / 2 + Math.min(126, vh * 0.16);
  const endSummaryX = endX;
  const endSummaryY = endY + scaledHeight / 2 + 22;

  const summaryX = startSummaryX + (endSummaryX - startSummaryX) * eased;
  const summaryY = startSummaryY + (endSummaryY - startSummaryY) * eased;

  summaryWrap.style.left = `${summaryX}px`;
  summaryWrap.style.top = `${summaryY}px`;
  summaryWrap.style.transform = "translateX(-50%)";

  const summaryScale = 1 - 0.36 * eased;
  summaryText.style.transform = `translateY(0) scale(${summaryScale})`;
  summaryText.style.opacity = "1";

  const nextProgress = clamp((progress - 0.55) / 0.45, 0, 1);
  const nextEased = easeOutCubic(nextProgress);

  nextSummary.style.opacity = `${nextEased}`;
  nextSummary.style.transform = `translateY(${34 - 18 * nextEased}px)`;
}

applyTheme(getSavedTheme());
updateHero();

window.addEventListener("scroll", updateHero, { passive: true });
window.addEventListener("resize", updateHero);