import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
// import { getUserInfo } from "@/utils/auth"; // 验权
NProgress.configure({
  template: `<div class="bar" role="bar">
                  <div class="peg"></div>
              </div>`,
  showSpinner: false,
  easing: "ease",
  speed: 500
});
const whiteList = ["/auth/login"]; // 不重定向白名单

const permission = function(router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (sessionStorage.getItem("msfInfo")) {
      next();
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next("/auth/login");
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};

export default permission;
