<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item v-if="item.meta.title" :key="index">
          <!-- <svg-icon icon-class="location" /> -->
          <img
            class="bread-icon"
            src="@/assets/image/location.png"
            v-if="index == 0"
          />
          <span
            v-if="
              item.redirect === 'noredirect' || index == levelList.length - 1
            "
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <router-link v-else :to="item.redirect || item.path">
            {{ item.meta.title }}
          </router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      routes: state => {
        return state.sideStatus.sideConfig;
      }
    })
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route: {
      deep: true,
      handler: function() {
        this.getBreadcrumb();
      }
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      this.levelList = matched;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 45px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .bread-icon {
    display: inline-block;
    vertical-align: -2px;
    margin-right: 4px;
  }
}
</style>
<style lang="scss"></style>
