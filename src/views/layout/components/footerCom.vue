<template>
  <footer class="footerCom" :style="fiexd ? 'position: fixed' : ''">
    <p>{{ $store.state.app.copyright }}</p>
  </footer>
</template>

<script>
export default {
  name: "footerCom",
  props: {
    fiexd: {
      default: false
    }
  },
  data() {
    return {
      // copyright: this.$store.state.app.copyright
    };
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.footerCom {
  height: 40px;
  width: 100%;
  background-color: white;
  /*position: fixed;*/
  bottom: 0;
  left: 0;
  color: #cccccc;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  z-index: 1;
  overflow: hidden;
  padding-top: 12px;
}
</style>
