<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <div ref="elScrollbar" class="el-menu-box">
        <el-menu
          unique-opened
          :default-active="$route.path"
          :collapse="isCollapse"
          mode="vertical"
          :background-color="themeColor[theme].bgColor"
          text-color="#252C3C"
          @select="select"
          active-text-color="#409EFF"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.name"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SidebarItem from "./SidebarItem";
import Hamburger from "@/components/Hamburger";
// import { setTimeout } from "timers";

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapState({
      routes: state => {
        return state.sideStatus.sideConfig;
      },
      themeColor: state => state.app.themeColor,
      theme: state => state.app.theme
    }),
    ...mapGetters(["sidebar"]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    select() {
      // console.log("回调");
      if (!this.sidebar.clickFlag && this.sidebar.opened) {
        this.$store.dispatch("ToggleSideBar2");
      }
    }
  },
  mounted() {
    // console.log(this.$refs.elScrollbar);
    this.sidebar.clickFlag = true;
    this.$refs.elScrollbar.addEventListener("mouseleave", () => {
      // console.log(this.sidebar.clickFlag);
      // console.log(this.sidebar.opened);
      if (!this.sidebar.clickFlag && this.sidebar.opened) {
        this.sidebar.opened = !this.sidebar.opened;
        // this.$store.dispatch('ToggleSideBar')
      }
    });
    this.$refs.elScrollbar.addEventListener("mouseenter", () => {
      // console.log(this.sidebar.clickFlag);
      // console.log(this.sidebar.opened);
      if (!this.sidebar.clickFlag && !this.sidebar.opened) {
        this.sidebar.opened = !this.sidebar.opened;
        // this.$store.dispatch('ToggleSideBar')
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 50px !important;
  .hamburger-container {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #dfe4f2;
  }
}
</style>
