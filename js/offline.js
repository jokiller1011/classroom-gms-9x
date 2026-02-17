if (!navigator.onLine) {
  location.href = "offline.html";
}

window.addEventListener("offline", () => {
  location.href = "offline.html";
});
