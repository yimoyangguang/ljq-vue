<template>
  <div class="container">
    <input class='ischecked' type="checkbox" @click='checkedAll($event)' name='67'>全选<br>
      <input class='a' type="checkbox" name="1" value='逛街' v-model="checkData">逛街
      <input class='a' type="checkbox" name="2" value='商场' v-model="checkData">商场
      <input class='a' type="checkbox" name="3" value='旅游' v-model="checkData">旅游
      <input class='a' type="checkbox" name="4" value='爬山' v-model="checkData">爬山
      <input class='a' type="checkbox" name="5" value='睡觉' v-model="checkData">睡觉
  </div>
</template>

<script>
export default {
  data() {
    return {
      ischecked: false,
      checkData: []
    };
  },
  components: {},
  watch: {
    checkData: {
      handler() {
        if (this.checkData.length == 5) {
          document.querySelector(".ischecked").checked = true;
        } else {
          document.querySelector(".ischecked").checked = false;
        }
      },
      deep: true
    }
  },
  methods: {
    checkedAll(e) {
      console.log(e);
      let inputs = document.querySelectorAll(".a");
      this.checkData = [];
      if (e.target.checked) {
        inputs.forEach(item => {
          this.checkData.push(item.value);
        });
      } else {
        this.checkData = [];
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
