<template>
  <div class="invitation" :style="{'height':heightH+'px'}">
    <downitem/>
  </div>
</template>
<script>
  import downitem from '@/components/downitem'

  export default {
    name: "register-success",
    components: {
      downitem
    },
    data() {
      return {
        heightH: window.innerHeight
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  img {
    display: block;
    width: 100%;
  }

  .invitation {
    background: url('../assets/images/success.png') no-repeat top left;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
  }

</style>
