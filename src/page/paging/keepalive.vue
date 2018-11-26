<template>
 <div class="container">
     <div >
         <div>
             <span @click='tabChange("tab1")'>change1</span>
             <span  @click='tabChange("tab2")'>change2</span>
            <keep-alive >
                <tab1 v-if="chage" ></tab1>
                <tab2 v-else></tab2>
            </keep-alive>
         </div>
     </div>
 </div>
</template>

<script>
import tab1 from "@/components/tabchange/tab1";
import tab2 from "@/components/tabchange/tab2";


export default {

  data() {
    return {
      chage: true,
      abc:"父组件的数据（abc）"
    };
  },
  components: {
    tab1,
    tab2
  },
  mounted() {
      this.changes();
  },
  methods: {
    tabChange(val) {
      this.chage = !this.chage;
    }
  }
};
</script>
<style scoped lang="less">
</style>
