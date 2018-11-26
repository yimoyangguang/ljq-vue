<template>
 <div class="container">
     <ul>
         <li v-for='(item,i) in message'  :key='item.id' class='por'>
           <i 
                @mouseenter="showManage(i,true)"
                @mouseleave="showManage(i,false)"> 
                {{item.name}}{{i}}</i>
           <div class='poa tip' v-show="aaa(i)">
               {{item.sex}}
           </div>
         </li>
     </ul>
 </div>
</template>

<script>
export default {
  data() {
    return {
      timers: {},
      message: [
        {
          name: "王屋",
          id: "24",
          sex: "男"
        },
        {
          name: "丽思",
          id: "22",
          sex: "男"
        },
        {
          name: "lina",
          id: "18",
          sex: "女"
        }
      ]
    };
  },
  methods: {
    aaa(i) {
      return !!this.message[i].aaa;
    },
    showManage(i, m) {
      debugger;
      const _this = this;
      _this.timers[i] && clearTimeout(_this.timers);
      if (!m) {
        _this.timers[i] = setTimeout(() => {
          _this.message[i].aaa = m;
          _this.$forceUpdate(); //强制更新
        });
      } else {
        _this.message[i].aaa = m;
        _this.$forceUpdate();
      }
    }
  }
};
</script>

<style scoped lang="less">
ul {
  li {
    position: relative;
    padding-left: 20px;
    line-height: 35px;
    border-bottom: 1px solid #ccc;
    .tip {
      padding: 5px;
      width: 100px;
      line-height: 18px;
      font-size: 12px;
      border-radius: 4px;
      background: #21283e;
      box-shadow: 0 2px 4px 0 rgba(100, 107, 140, 0.3);
      opacity: 0.9;
      position: absolute;
      top: 5px;
      left: 70px;
      z-index: 2001;
      color: white;
    }
    .tip:before {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5.5px 5.5px 7px 17.5px;
      border-color: rgba(255, 255, 255, 0.03137) #21283e rgba(0, 62, 255, 0)
        rgba(0, 255, 43, 0);
      position: absolute;
      top: 7px;
      left: -22px;
    }
  }
}
</style>

