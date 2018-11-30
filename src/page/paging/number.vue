<template>
  <div class="container">
    数字的精确度
    {{massage}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0.00000000458,
      b: 0.0000125,
      massage: ""
    };
  },
  components: {},
  mounted() {
    this.massage = this.$np.plus(this.a, this.b);
  }
};
</script>

<style scoped lang="less">
</style>
