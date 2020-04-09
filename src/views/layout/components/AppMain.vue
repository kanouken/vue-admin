<template>
  <section class="app-main">
    <div class="app-main-con">
      <transition name="fade-transform" mode="out-in">
        <!-- or name="fade" -->
        <router-view :key="key"></router-view>
        <!--<router-view/>-->
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  /*min-height: calc(100vh - 195px);*/
  min-height: calc(100vh - 190px);
  position: relative;
  margin-bottom: 16px;
  /*padding-bottom: 10px;*/
  box-sizing: border-box;
  .app-main-con {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
