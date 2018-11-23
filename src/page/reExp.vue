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
        debugger
        return this.firstname + this.lastname;
      },
      set: function(n) {
        debugger
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
          debugger
          this.fullname='John,Doe';
      }
  }
};
</script>

<style scoped lang="less">
</style>
