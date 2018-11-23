import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import * as mutations from './mutations'


Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
