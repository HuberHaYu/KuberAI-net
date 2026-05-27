const root = document.documentElement;
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

applyTheme(getSavedTheme());