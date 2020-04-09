import Cookies from "js-cookie";
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get("sidebarStatus"),
      clickFlag: Cookies.get("clickFlag") ? true : false,
      withoutAnimation: true,
      bgColor: "#304156"
    },
    headbar: {
      bgColor: "#304156"
    },
    device: "desktop",
    copyright: Cookies.get("copyright")
      ? Cookies.get("copyright")
      : "广东赛百威信息科技有限公司",
    totalUnread: Cookies.get("totalUnread") ? Cookies.get("totalUnread") : "0",
    systemName: "",
    theme: "default",
    themeColor: {
      default: {
        bgColor: "#f2f2f7"
      },
      "red-theme": {
        bgColor: "#ff0000"
      },
      "green-theme": {
        bgColor: "#006000"
      },
      "white-theme": {
        bgColor: "#fff"
      }
    },
    refreshTree: false,
    menus: JSON.parse(localStorage.getItem("menu"))
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
        Cookies.set("clickFlag", true);
      } else {
        Cookies.set("sidebarStatus", false);
        Cookies.set("clickFlag", 1);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.clickFlag = state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    TOGGLE_SIDEBAR2: state => {
      Cookies.set("sidebarStatus", 1);
      Cookies.set("clickFlag", true);
      // if (state.sidebar.opened) {

      // } else {
      //   Cookies.set("sidebarStatus", false);
      //   Cookies.set("clickFlag", 1);
      // }
      state.sidebar.opened = true;
      state.sidebar.clickFlag = state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set("sidebarStatus", 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_COPYRIGHT(state, param) {
      Cookies.set("copyright", param);
      state.copyright = param;
    },
    SET_TOTALUNREAD(state, param) {
      Cookies.set("totalUnread", param);
      state.totalUnread = param;
    },
    SET_BG_COLOR: (state, color) => {
      state[color.component].bgColor = color.color;
    },
    SET_THEME(state, param) {
      state.theme = param;
    },
    SET_REFRESH_TREE(state, param) {
      state.refreshTree = param;
    },
    SET_MENUS(state, n) {
      state.menus = n;
    },
    set_SystemName(state, param) {
      state.systemName = param;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    ToggleSideBar2: ({ commit }) => {
      commit("TOGGLE_SIDEBAR2");
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    SetCopyright: ({ commit }, param) => {
      commit("SET_COPYRIGHT", param);
    },
    SetTotalUnread: ({ commit }, param) => {
      commit("SET_TOTALUNREAD", param);
    },
    SetBgColor({ commit }, color) {
      commit("SET_BG_COLOR", color);
    },
    setTheme({ commit }, param) {
      commit("SET_THEME", param);
    },
    setSystemName({ commit }, param) {
      localStorage.setItem("set_SystemName", param);
      commit("set_SystemName", param);
    },
    setRefreshTree({ commit }, param) {
      commit("SET_REFRESH_TREE", param);
    },

    setMenus({ commit }, m) {
      localStorage.setItem("menu", JSON.stringify(m));
      commit("SET_MENUS", m);
    }
  }
};

export default app;
