// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from "iview";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "../my-theme/dist/index.less";
import iviewArea from "iview-area";


Vue.prototype.$http = axios;
Vue.config.productionTip = true;
/* eslint-disable no-new */
Vue.use(iView);
Vue.use(iviewArea);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
