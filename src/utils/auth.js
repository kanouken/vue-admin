import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

const UserInfo = "userInfo";

export function getUserInfo() {
  if (localStorage.getItem(UserInfo)) {
    return JSON.parse(localStorage.getItem(UserInfo));
  } else {
    return null;
  }
}

export function setUserInfo(userInfo) {
  if (userInfo) {
    return Cookies.set(UserInfo, JSON.stringify(userInfo));
  } else {
    return Cookies.set(UserInfo, "");
  }
}

export function removeUserInfo() {
  localStorage.removeItem(UserInfo);
  localStorage.removeItem("msfInfo");
  localStorage.removeItem("menu");
  window.sessionStorage.removeItem("activeMenu");
}
