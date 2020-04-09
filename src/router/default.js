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
];
//no login redirect login page
export default myRouter;
