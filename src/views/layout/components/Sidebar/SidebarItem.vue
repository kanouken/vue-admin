<template>
  <div class="menu-wrapper">
    <template v-if="!item.children || item.children.length == 0">
      <a
        data-uio="0"
        :href="item.path"
        target="_blank"
        @click="clickLink(item.path, $event)"
      >
        <el-menu-item
          :index="item.path"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item v-if="item" :icon="item.icon" :title="item.name" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu
      v-else
      :index="item.name || item.path"
      popper-class="popperClass"
    >
      <template slot="title">
        <item v-if="item" :icon="item.icon" :title="item.name" />
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="child.path"
          class="nest-menu"
        />
        <a
          v-else
          :href="child.path"
          :key="child.name"
          target="_blank"
          @click="clickLink(child.path, $event)"
        >
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child" :icon="child.icon" :title="child.name" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { validateURL } from "@/utils/validate";
import Item from "./Item";
import { mapGetters } from "vuex";

export default {
  name: "SidebarItem",
  components: { Item },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    resolvePath(routePath) {
      let a = path.resolve(this.basePath, routePath);
      // console.log(a,'ppp')
      return a;
    },
    isExternalLink(routePath) {
      return validateURL(routePath);
    },
    clickLink(routePath, e) {
      if (!this.isExternalLink(routePath)) {
        e.preventDefault();
        // const path = this.resolvePath(routePath)
        // console.log(routePath)
        // this.$router.push(routePath)
        this.$router.push({
          path: routePath,
          query: {
            t: +new Date()
          }
        });
      }
    },
    mounted() {}
  }
};
</script>
<style lang="scss">
.menu-wrapper {
  .sidebar-container .el-menu {
    // background-color: red!important;
  }
  .el-submenu__title i {
    color: inherit;
    font-size: 14px;
  }
  .el-submenu ul,
  .el-submenu ul a,
  .el-submenu ul a li {
    background: #fff !important;
    color: #252c3c !important;
  }

  // .el-menu-item.is-active {
  //     background: #F4F4FC !important;
  // }
}
#app .sidebar-container .el-menu-item.is-active {
  background: #f3f9ff !important;
  color: #252c3c !important;
}

.popperClass {
  left: 36px !important;
}
</style>
