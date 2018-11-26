<template>
 <div class="container">
<div >正则match、test、search、replace、split、exec</div>
<div>{{fullname}}</div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: "foo",
      lastname: "bar",
    };
  },
  components: {},
  computed: {
    fullname: {
      get: function() {
        
        return this.firstname + this.lastname;
      },
      set: function(n) {
        
        let names = n.split(",");
        this.firstname = names[0];
        this.lastname = names[names.length - 1];

      }
    }
  },
  mounted() {
      this.a();
  },
  methods: {
      a(){
          
          this.fullname='John,Doe';
      }
  }
};
</script>

<style scoped lang="less">
</style>
