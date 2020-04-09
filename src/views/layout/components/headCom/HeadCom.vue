<template>
  <div
    class="headCom"
    :style="{ 'background-color': themeColor[theme].bgColor }"
  >
    <div class="headCom-bottom">
      <div class="headCom-login">
        <img src="@/assets/logo2.png" alt />
      </div>
      <headMember></headMember>
      <div
        class="headCom-menu"
        id="headComMenu"
        :style="{ 'background-color': '#106AF1' }"
      >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :background-color="'#106AF1'"
          text-color="#D8EBFF"
          active-text-color="#fff"
        >
          <template v-for="(router, routerKey) in routerConfig">
            <el-menu-item
              :index="router.value"
              :key="routerKey"
              v-if="moreIndex == 0 || routerKey <= moreIndex"
              >{{ router.name }}</el-menu-item
            >
          </template>
          <template v-if="moreIndex != 0">
            <el-submenu
              index="moreMenu"
              v-if="routerConfig.length"
              class="moreMenu"
            >
              <template slot="title">更多</template>
              <template v-for="(router_, routerKey_) in routerConfig">
                <el-menu-item
                  :index="router_.value"
                  :key="routerKey_"
                  v-if="show(routerKey_, moreIndex)"
                  >{{ router_.name }}</el-menu-item
                >
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <!-- <headMember></headMember> -->
      </div>
    </div>
  </div>
</template>

<script>
import headMember from "./headMember";
import { mapState, mapGetters } from "vuex";
import { validateURL } from "@/utils/validate";

export default {
  name: "HeadCom",
  components: {
    headMember
  },
  data() {
    return {
      headMenuConfig: [],
      routerConfig: [],
      routerConfig_: [],
      moreIndex: 0,
      activeIndex: null
    };
  },
  computed: {
    ...mapState({
      sideConfig: state => state.sideStatus.sideConfig,
      themeColor: state => state.app.themeColor,
      theme: state => state.app.theme
    }),
    ...mapGetters(["headbar"])
  },
  methods: {
    show(routerKey_, moreIndex) {
      return routerKey_ > moreIndex;
    },
    handleSelect(key) {
      if (key == "moreMenu") return;
      let active = this.routerConfig.find(v => {
        return key == v.value;
      });
      this.activeIndex = key;
      window.sessionStorage.setItem("activeMenu", key);
      //判断是否符合url
      if (validateURL(active.path)) {
        window.open(active.path);
      } else {
        //判断path
        if (active.path) {
          this.$router.push(active.path);
          this.$store.dispatch("setSideConfig", active.children);
        }
      }
    },
    //计算宽度
    setRouterConfig() {
      if (!window.sessionStorage.getItem("activeMenu")) {
        window.sessionStorage.setItem("activeMenu", this.activeIndex);
      } else {
        this.activeIndex = window.sessionStorage.getItem("activeMenu");
        let active = this.headMenuConfig.filter(v => {
          //console.log(v.value);
          //console.log(this.activeIndex);
          return v.value == this.activeIndex;
        });
        if (null == active) {
          active = this.headMenuConfig[0];
        }
        if (active.length !== 0) {
          this.$store.dispatch("setSideConfig", active[0].children);
        }
      }
      let width = 0,
        allWidth = document.getElementById("headComMenu").offsetWidth - 75;
      for (let i = 0; i < this.headMenuConfig.length; i++) {
        let v = this.headMenuConfig[i];
        width += v.name.length * 14 + 20;
        if (i < this.headMenuConfig.length - 1) {
          if (
            allWidth - width <
            this.headMenuConfig[i + 1].name.length * 14 + 20
          ) {
            this.moreIndex = i;
            break;
          }
        } else {
          this.moreIndex = 0;
        }
      }
      this.routerConfig = this.headMenuConfig;
      this.activeIndex = "dashboard-sy";
    }
  },
  mounted() {
    this.headMenuConfig = this.$store.state.app.menus;
    //console.log(this.headMenuConfig);
    this.activeIndex = this.headMenuConfig[0].value;
    this.setRouterConfig();
    window.addEventListener("resize", () => {
      this.setRouterConfig();
    });
  }
};
</script>

<style lang="scss" scoped>
.headCom {
  height: 50px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 520;
  transition: all 0.3s;
  .headCom-bottom {
    width: 100%;
    padding-left: 180px;
    height: 50px;
    background: #106af1;
    position: relative;
  }
  .headCom-login {
    position: absolute;
    left: 0;
    top: 0;
    width: 180px;
    height: 50px;
    z-index: 1;
    img {
      width: 180px;
      height: 50px;
    }
  }
  .headCom-menu {
    width: calc(100% - 180px);
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    // padding-top: 15px;
    // padding-left: 15px;
    ul {
      flex: 1;
    }
    .headMember {
      width: 300px;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
#app .headCom .el-menu--horizontal > .el-menu-item.is-active {
  background: linear-gradient(
    0deg,
    rgba(15, 108, 241, 1),
    rgba(42, 161, 255, 1),
    rgba(0, 138, 247, 1)
  ) !important;
  color: #fff !important;
  font-weight: bold;
  border-bottom: none !important;
}
</style>
