import {
  getUsers,
  saveUsers,
  setCurrentUser
} from "./storage.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");

document.getElementById("signupBtn").onclick = () => {
  const users = getUsers();

  if (!username.value || !password.value) {
    error.textContent = "Fill in all fields";
    return;
  }

  if (users[username.value]) {
    error.textContent = "User already exists";
    return;
  }

  users[username.value] = {
    password: password.value,
    progress: {}
  };

  saveUsers(users);
  setCurrentUser(username.value);
  location.href = "dashboard.html";
};

document.getElementById("loginBtn").onclick = () => {
  const users = getUsers();
  const user = users[username.value];

  if (!user || user.password !== password.value) {
    error.textContent = "Invalid login";
    return;
  }

  setCurrentUser(username.value);
  location.href = "dashboard.html";
};
