/**
 *  模拟接口返回菜单数据
 * @returns {Array}
 */
const productHostRouters = function() {
  let routes = [];

  let system = {
    name: "系统管理",
    code: "sys",
    path: "/sys",
    icon: "",
    children: [
      //此种节点要添加 layout 到前面
      {
        name: "组织架构",
        code: "sys-zzjj",
        path: "/sys/org",
        type: 1, //一级菜单显示
        isLeaf: false,
        parent: "",
        sys: "sys",
        icon: "el-icon-news",
        component: "layout",
        children: [
          {
            name: "岗位管理",
            code: "sys-gggl",
            path: "/sys/post",
            type: 2,
            isLeaf: true,
            parent: "sys-zzjj",
            sys: "sys",
            icon: "el-icon-news",
            component: "organizationStructure/postManage/index",
            children: []
          }
        ]
      },
      {
        name: "权限管理",
        code: "sys-qqgl",
        path: "/sys/permission",
        isLeaf: false,
        type: 1,
        parent: "",
        sys: "sys",
        icon: "el-icon-news",
        component: "layout",
        children: [
          {
            name: "用户管理",
            code: "sys-qqgl-ylgl",
            path: "/sys/permission/user",
            isLeaf: true,
            type: 2,
            parent: "sys-qqgl",
            sys: "sys",
            icon: "el-icon-news",
            component: "permission/userManagement/index",
            children: []
          }
        ]
      }
    ]
  };

  let dashboard = {
    name: "首页",
    code: "dashboard",
    path: "/dashboard",
    icon: "",

    children: [
      {
        name: "首页",
        code: "dashboard-sy",
        path: "/dashboard/index",
        type: 1, //一级菜单显示
        isLeaf: false, //fixme 不在左侧layout中显示
        parent: "dashboard",
        sys: "dashboard",
        icon: "el-icon-news",
        component: "home/index",
        children: []
      }
    ]
  };

  routes.push(dashboard);
  routes.push(system);

  return routes;
};
export default {
  productHostRouters
};
