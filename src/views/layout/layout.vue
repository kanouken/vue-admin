<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar class="navbar" />
      <app-main class="app-main" />
      <footerCom ref="footerCom" class="footerCom" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, footerCom } from "./components/index";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    footerCom
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .main-container {
    height: 100%;
    overflow: hidden;
    position: relative;
    /*padding-top: 50px;*/
    margin-top: 50px;
    overflow-y: auto;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
