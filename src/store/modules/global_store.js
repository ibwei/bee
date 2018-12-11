export default {
  state: {
    isLogin: false,
    beeSiteList: [],
    projectNameList:[],
    projectTypeList: [],
    beeTypeList: ["西方蜜蜂", "中华蜜蜂"],
    honeycombTypeList: ["中标框", "意标框"],
    checkTypeList: ["封盖率", "产卵力"]
  },
  mutations: {
    changelogin(state) {
      state.isLogin = !state.isLogin;
    }
  }
};
