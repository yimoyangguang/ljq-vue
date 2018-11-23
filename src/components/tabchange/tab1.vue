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
             {{$parent.abc}}点我
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
          title: "庞",
          content:'lao pang shi ge sha bi '
        },
        {
          id: 2,
          title: "傻",
          content:'zhen de ye '
        },
        {
          id: 3,
          title: "比",
          content:'da jia dou jue de'
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
