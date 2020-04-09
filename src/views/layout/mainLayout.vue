<template>
  <div class="mainLayout">
    <HeadCom></HeadCom>
    <div class="mainLayout-main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { HeadCom } from "./components/index";
export default {
  name: "mainLayout",
  components: {
    HeadCom
  },
  mounted() {
    // let htmlEl = document.getElementsByTagName('*');
    // console.log(htmlEl)
    // for(let i=0;i<htmlEl.length;i++){
    //   if(!htmlEl[i].id){
    //     htmlEl[i].id='id_'+i
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.mainLayout {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: #ececf4;
  // padding-top: 50px;
  .mainLayout-main {
    padding: 0;
    height: 100%;
  }
}
</style>
