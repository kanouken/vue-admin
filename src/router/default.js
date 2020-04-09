/**
 * 定义基本路由
 * @type {{path: string, redirect: string}[]}
 */
const myRouter = [
  {
    path: "/",
    redirect: "/dashboard/index"
  },
  {
    path: "/auth/login",
    component: () => import("cyberway-msf-frontend-web-auth/src/views/login"),
    name: "authLogin",

    props: () => ({
      sysName: "{{title}}",
      multiTenant: false
    }),
    meta: {
      title: "登陆",
      icon: "el-icon-news",
      requiresAuth: false
    },
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
  // // 我的信息
  // {
  //   path: "my/myInfo",
  //   component: () =>import("cyberway-msf-frontend-web-sys/src/views/permission/userManagement/components/editUserManagement.vue"),
  //   name: "my",
  //   meta: {
  //     title: "个人资料",
  //     icon: "el-icon-news",
  //     requiresAuth: false
  //   },
  //   hidden: true
  // },
];
//no login redirect login page
export default myRouter;
