import np from 'number-precision'

function install(Vue) {
    debugger
  Vue.prototype.$np = np;
  Vue.$np = np;//防止在没有Vue实例的情况下使用
}
export default install;
