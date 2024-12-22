import { MOCK_REQUEST, URL_ROOT } from 'src/common/requestHelper.js';

export function usernameExists(username) {
  if (MOCK_REQUEST) {
    if (username.toLowerCase() == "iloverenata") {
      return true;
    }
    return false;
  }
  // MAKE REQUEST
}

export function login(username, pin) {
  if (MOCK_REQUEST) {
    if (pin == "013195") {
      localStorage.setItem("isLoggedIn", true);
      return true;
    }
    return false;
  }
}

export function logout() {
  if (MOCK_REQUEST) {
    localStorage.setItem("isLoggedIn", false);
    console.log("loggedout");
    return true;
  }
}