import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './store/axios'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuelidate from 'vuelidate'
import Mint from 'mint-ui';
import {
  Toast
} from 'mint-ui';
import {
  Select,
  Option,
  Checkbox,
  Dialog,
  Input,
  Loading,
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'

Vue.component(Toast.name, Toast);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(Mint);
Vue.use(Vuelidate);

Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Input)
Vue.mixin({
  data() {
    return {
      isShow: 'aa',
      phones: false,
      windowH: ''
    }
  },
  methods: {
    changes() {},
    isPhoneMobile() {
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      );
      var flag = false;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = true;
          break;
        }
      }
      this.phones = flag;
    },
  },
  mounted() {
    this.isPhoneMobile();
    this.windowH = window.innerHeight;
  }
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
