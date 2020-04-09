/*eslint-disable no-unused-vars */
import * as auth from "@/utils/auth";
const user = {
  state: {
    token: auth.getToken(),
    name: "",
    avatar: "",
    roles: [],
    userInfo: auth.getUserInfo()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
        ? userInfo
        : { id: "", token: "", companyId: "", username: "" };
    },

    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {});
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {});
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {});
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_USERINFO", "");
        auth.removeToken();
        auth.removeUserInfo();
        resolve();
      });
    }
  }
};

export default user;
