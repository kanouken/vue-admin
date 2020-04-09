/*eslint-disable */
import layout from "@/views/layout/layout";
import mainLayout from "@/views/layout/mainLayout";
import defaultRouter from "./default";
import pub from "pubsub-js";
const importer = require("./importer");

function initRouters(vue, callback) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let menu = JSON.parse(localStorage.getItem("menu"));
  let data = null;
  if (userInfo && userInfo.menu) {
    data = userInfo.menu;
  } else {
    vue.$router.addRoutes(defaultRouter);
    vue.$router.replace("/auth/login");
    return;
  }
  //生成菜单
  if (menu == null) {
    let menus = buildMenus(data);
    // //console.log(menus);
    //done
    vue.$store.dispatch("setMenus", menus);
  }

  //重组路由层级
  reactModuleRouters(data);
  //过滤组件
  data.forEach(d => (d.component = "mainLayout"));
  let myRouter = filterComponent(data);
  myRouter = myRouter.concat(defaultRouter);
  //console.log(myRouter)
  vue.$router.addRoutes(myRouter);
  if (callback) {
    callback();
  }
}

function buildMenus(modules) {
  let navMenus = [];
  modules.forEach(m => {
    const menuMap = {};

    menuMap["children"] = buildMenuItem(m.children);

    menuMap["name"] = m.name;

    menuMap["path"] = m.path;
    menuMap["value"] = m.code;
    navMenus.push(menuMap);
  });

  return navMenus;
}

function buildMenuItem(moduleRouters) {
  //生成菜单数据
  let myMenus = [];
  moduleRouters.forEach(router => {
    //console.log(router);
    if (router.menuType && router.menuType === 1) {
      const menu = {
        name: router.name,
        icon: router.icon,
        path: router.path
      };
      //submenus
      if (router.children && router.children.length > 0) {
        let children = [];
        router.children.forEach(child => {
          if (child.menuType && child.menuType == 2) {
            children.push({
              name: child.name,
              icon: child.icon,
              path: child.path
            });
          }
        });
        menu.children = children;
      } else {
        menu.children = [];
      }
      myMenus.push(menu);
    }
  });

  return myMenus;
}

function filterComponent(modules) {
  return modules.filter(m => {
    m.meta = {
      title: m.name,
      icon: m.icon
    };
    m.name = m.code;
    if (m.component) {
      if (m.component === "layout") {
        //Layout组件特殊处理
        m.component = layout;
      } else if (m.component === "mainLayout") {
        m.component = mainLayout;
      } else {
        //console.log(m.component);
        var mCode = m.sys;
        try {
          eval("m.component = importer." + mCode + "(m.component)");
        } catch (e) {
          m.component = null;
          //console.log(e);
        }
      }
    }
    if (m.children && m.children.length) {
      m.children = filterComponent(m.children);
    }
    return true;
  });
}

// 对层级进行路由嵌套重构
function reactModuleRouters(modules) {
  modules.forEach(m => {
    //无左侧菜单显示
    if (m.component != null && m.component != "mainLayout") {
      ////console.log(m.component);
      m.children.push({
        name: m.name,
        code: m.code + "-1",
        path: m.path,
        icon: m.icon,
        sys: m.sys,
        component: m.component,
        children: []
      });
    }
    m.component = "mainLayout";

    m.children.forEach(router => {
      //console.log("react 1" , router);
      //console.log("childRen" , router.children);
      // 一级菜单提前
      if (
        router.menuType == 1 &&
        router.children &&
        router.children.filter(r => r.menuType == 1).length == 0 &&
        (router.component != "layout" || router.component != "mainLayout")
      ) {
        let com = router.component;
        let path = router.path;
        router.component = "layout";
        // router.path = router.path.substr(0, router.path.lastIndexOf("/"));
        router.children.push({
          name: router.name,
          code: router.code + "-1",
          path: path,
          isLeaf: true,
          type: 2,
          level: 2,
          parent: router.code,
          sys: router.sys,
          icon: router.icon,
          component: com,
          children: []
        });
      }
      // 子页面提前
      router.children.forEach(child => {
        if (child.children && child.children.length > 0) {
          router.children = router.children.concat(child.children);
          child.children = [];
        }
      });
    });

    redirectRouter(m);
  });
}
function redirectRouter(m) {
  if (m.children && m.children.length > 0) {
    let _m = m.children[0];
    if (
      _m.children &&
      _m.children.length > 0 &&
      _m.children.filter(d => d.menuType === 2).length > 0
    ) {
      let subMenus = _m.children.filter(d => d.menuType === 2);
      m.redirect = subMenus[0].path;
    } else {
      m.redirect = _m.path;
    }
  }
}
export { initRouters };
