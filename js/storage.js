const USERS_KEY = "crg9x_users";
const CURRENT_USER_KEY = "crg9x_current_user";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setCurrentUser(username) {
  localStorage.setItem(CURRENT_USER_KEY, username);
}

export function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
