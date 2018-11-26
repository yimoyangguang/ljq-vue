<template>
 <div class="container">
     <div >
        <div  class='ovh child'>
             <ul class='fl'>
             <li 
             :class="{ selected: item === selectedPost }"
             @click='cli(item)' 
             :key='item.id'
             v-for='item in posts'>{{item.title}}</li>
         </ul>
         <div class='fl' v-if='selectedPost'>  
                <div>{{selectedPost.content}}</div>
         </div>
         <div   class='fl' v-else>
            $parent用于获取 {{$parent.abc}}
         </div>
        </div>
     </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "标题1",   
          content:'State，单一状态树，Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。'
        },
        {
          id: 2,
          title: "标题2",
          content:'单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中 '
        },
        {
          id: 3,
          title: "标题3",
          content:'然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。'
        }
      ],
      selectedPost: null
    };
  },
  components: {},
  methods: {
    cli(val) {
      this.selectedPost = val;
    }
  }
};
</script>
<style scoped lang="less">
.child {
  border: 1px solid #f2f2f2;
  & > ul {
    border-right: 1px solid red;
    li.selected{
        color:hotpink;
    }
  }
}
</style>
