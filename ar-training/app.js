// Checkpoint 1: just confirm tracking state on-screen.
// (No hazard interactions yet - that comes in a later checkpoint.)

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("status-banner");
  const target = document.getElementById("target-0");

  if (!target) return;

  target.addEventListener("targetFound", () => {
    banner.textContent = "Target found! Cube should be visible.";
  });

  target.addEventListener("targetLost", () => {
    banner.textContent = "Target lost - point camera at the image again.";
  });
});
