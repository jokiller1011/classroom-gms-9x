let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "flex";
});

// REQUIRED: user gesture
document.getElementById("installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
});
