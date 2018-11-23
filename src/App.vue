<template>
  <div id="app">
    <keep-alive>
      <router-view>
        <HelloWorld/>
      </router-view>
    </keep-alive>
  </div>
</template>
<script>
  import invite from './page'
  export default {
    name: 'App',
    components: {
      invite
    },
    mounted() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
      document.body.appendChild(s);
    },
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
