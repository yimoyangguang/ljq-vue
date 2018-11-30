<template>
 <div class=" paging container">
     <div><router-link to='/paging/keep'> keep-alive table切換</router-link> </div>
     <div> <router-link to='/paging/allcheckbox'> 全选和全部选</router-link></div>
      <div> <router-link to='/slide'> 滑屏</router-link></div>
      <div> <router-link to='/paging/hover'> 数据循环hover效果</router-link></div>
      <div> <router-link to='/paging/pubsub'>pubsub.js兄弟组件通讯</router-link></div>
      <div> <router-link to='/paging/number'>计算较小的数字（电脑出现科学计算法->'e-'）</router-link></div>


 </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="less">
</style>
