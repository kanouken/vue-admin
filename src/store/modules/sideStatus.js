const sideStatus = {
  state: {
    sideConfig: []
  },

  mutations: {
    SET_SIDE_CONFIG: (state, sideConfig) => {
      state.sideConfig = sideConfig;
    }
  },

  actions: {
    // 设置侧边栏状态配置
    setSideConfig({ commit }, sideConfig) {
      //console.log("sideConfig: ===" + sideConfig)
      commit("SET_SIDE_CONFIG", sideConfig);
    }
  }
};

export default sideStatus;
