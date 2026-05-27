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