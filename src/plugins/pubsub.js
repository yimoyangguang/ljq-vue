import * as pubsub from 'pubsub-js'

function _pubsub() {
  this.aa = 1
 
}

_pubsub.prototype = pubsub

function install(Vue) {
    debugger
    const n = new _pubsub();
    Vue.mixin({
      created() {
        if (this.$options.subscribe) {
          const methods = this.$options.subscribe.call(this)
          for (const _method in methods) {
            if (typeof methods[_method] == 'function') {
              n.subscribe(n[_method], (sub, res) => {
                methods[_method].call(this, res)
              })
            }
          }
        }
      }
    })
  
    Vue.prototype.$pubsub = n
    Vue.$pubsub = n
  }
  
  export default install