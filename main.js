const root = document.documentElement;
const button = document.getElementById("themeButton");
const text = document.getElementById("themeText");

const modes = ["auto", "light", "dark"];
const labels = {
  auto: "自动",
  light: "浅色",
  dark: "深色"
};

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

  if (text) {
    text.textContent = labels[mode];
  }

  localStorage.setItem("kuberai-theme", mode);
}

function nextTheme(mode) {
  const index = modes.indexOf(mode);
  return modes[(index + 1) % modes.length];
}

let currentTheme = getSavedTheme();
applyTheme(currentTheme);

if (button) {
  button.addEventListener("click", () => {
    currentTheme = nextTheme(currentTheme);
    applyTheme(currentTheme);
  });
}

const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!coarsePointer && !reduceMotion) {
  window.addEventListener("pointermove", (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    root.style.setProperty("--mouse-x", `${x}`);
    root.style.setProperty("--mouse-y", `${y}`);

    document.body.style.backgroundPosition = `${x * 18}px ${y * 18}px, ${x * -12}px ${y * -12}px, center`;
  });
}

document.querySelectorAll(".demo-audio").forEach((audio) => {
  audio.preload = "auto";
  audio.load();

  audio.addEventListener("play", () => {
    document.querySelectorAll(".demo-audio").forEach((other) => {
      if (other !== audio) {
        other.pause();
      }
    });
  });
});
