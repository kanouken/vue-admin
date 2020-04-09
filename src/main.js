import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App";

import Router from "vue-router";
import "@/assets/styles/index.scss";
import "@/assets/styles/theme/default/index.css";
import store from "./store";
import "./icons";
import { initRouters } from "./router";
import permission from "@/router/permission";
import pub from "pubsub-js";
Vue.use(Router);
Vue.use(ElementUI);

let vueRouter = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: []
});
permission(vueRouter);
let vue = new Vue({
  el: "#app",
  router: vueRouter,
  store,
  render: h => h(App)
});
initRouters(vue);

//listen login success event
pub.subscribe("AUTH_LOGIN_SUCCESS", function(msg, data) {
  localStorage.setItem("userInfo", JSON.stringify(data));
  initRouters(vue, () => {
    vue.$router.push({
      path: "/dashboard/index"
    });
  });
});
//session  redirect to loginPage
pub.subscribe("AUTH_SESSION_TIMEOUT", function() {
  store.dispatch("FedLogOut").then(() => {
    location.href = "";
  });
});
