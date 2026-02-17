import { getCurrentUser, logout } from "./storage.js";

if (!getCurrentUser()) {
  location.href = "login.html";
}

document.getElementById("logout").onclick = () => {
  logout();
  location.href = "index.html";
};
