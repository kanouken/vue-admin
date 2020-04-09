<template>
  <div class="layout-item" :class="flag ? 'left-slide' : ''">
    <div class="layout-item-left">
      <slot name="left"></slot>
      <div class="select-arrow" @click="flag = !flag">
        <i class="el-icon-back"></i>
      </div>
    </div>
    <div class="layout-item-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutItemTree",
  data() {
    return {
      flag: false
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.layout-item {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-left: 255px;
  /*padding-bottom: 15px;*/
  padding-top: 15px;
  transition: all 0.4s;
  /*min-height: 800px;*/
  height: 100%;
  > div {
    /*margin-top: 15px;*/
    transition: all 0.4s;
  }
  .layout-item-left {
    position: absolute;
    width: 240px;
    left: 0;
    top: 15px;
    bottom: 0px;
    z-index: 1;
    background-color: white;
    .select-arrow {
      position: absolute;
      height: 50px;
      width: 25px;
      background-color: white;
      // box-shadow: -2px 0 4px #dcdcdc;
      color: #000;
      font-size: 16px;
      top: 27%;
      right: 0px;
      transform-origin: 25px 30px;
      transform: translateY(-50%) rotateY(0deg);
      text-align: center;
      line-height: 50px;
      transition: all 0.6s;
      z-index: 2;
      cursor: pointer;
      background: #f5faff;
      i {
        margin-right: -11px;
      }
    }
  }
  .layout-item-right {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    overflow-y: auto;
    padding-right: 15px;
    box-sizing: border-box;
    overflow-x: hidden;
  }
}
.left-slide {
  padding-left: 25px;
  .layout-item-left {
    transform: translateX(-100%);
    .select-arrow {
      background: #fff;
      transform: translateY(-50%) rotateY(180deg);
    }
  }
}
</style>
