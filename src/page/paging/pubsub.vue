<template>
  <div class="container">
      发布订阅
      <ac/>
      <bc/>
      </div>
</template>

<script>
import  ac from '@/components/pubsubtest/a'
import  bc from '@/components/pubsubtest/b'
export default {
  data() {
    return {};
  },
  components:{
      ac,bc
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="less">
</style>
