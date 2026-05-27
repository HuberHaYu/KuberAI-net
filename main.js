const root = document.documentElement;
const titleWrap = document.getElementById("titleWrap");
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
  if (!titleWrap || !summaryText || !nextSummary) return;

  const lockDistance = Math.min(720, window.innerHeight * 0.86);
  const progress = clamp(window.scrollY / lockDistance, 0, 1);
  const eased = easeOutCubic(progress);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const endRight = 50;
  const endTop = 30;

  titleWrap.style.transform = "translate(-50%, -50%) scale(1)";
  const titleRect = titleWrap.getBoundingClientRect();

  const startX = vw / 2;
  const startY = vh / 2;

  const scale = 1 - 0.68 * eased;
  const scaledWidth = titleRect.width * scale;
  const scaledHeight = titleRect.height * scale;

  const endX = vw - endRight - scaledWidth / 2;
  const endY = endTop + scaledHeight / 2;

  const x = startX + (endX - startX) * eased;
  const y = startY + (endY - startY) * eased;

  titleWrap.style.left = `${x}px`;
  titleWrap.style.top = `${y}px`;
  titleWrap.style.transform = `translate(-50%, -50%) scale(${scale})`;

  const startSummaryX = vw / 2;
  const startSummaryY = vh / 2 + Math.min(124, vh * 0.16);
  const endSummaryX = endX;
  const endSummaryY = endY + scaledHeight / 2 + 22;

  const summaryX = startSummaryX + (endSummaryX - startSummaryX) * eased;
  const summaryY = startSummaryY + (endSummaryY - startSummaryY) * eased;

  const summaryScale = 1 - 0.34 * eased;

  summaryText.style.left = "50%";
  summaryText.style.top = "0";
  summaryText.style.opacity = "1";
  summaryText.style.transform = `translate(calc(-50% + ${summaryX - vw / 2}px), ${summaryY - startSummaryY}px) scale(${summaryScale})`;

  const newSummaryOpacity = clamp((progress - 0.62) / 0.38, 0, 1);
  const newSummaryOffset = 26 * (1 - easeOutCubic(newSummaryOpacity));

  nextSummary.style.opacity = `${newSummaryOpacity}`;
  nextSummary.style.transform = `translateY(${28 + newSummaryOffset}px)`;
}

applyTheme(getSavedTheme());
updateHero();

window.addEventListener("scroll", updateHero, { passive: true });
window.addEventListener("resize", updateHero);