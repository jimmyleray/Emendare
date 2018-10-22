import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
  state: {
    pending: false,
    isLoggedIn: !!localStorage.getItem('token')
  },
  getters: {
    isPending: state => state.pending,
    isLoggedIn: state => state.isLoggedIn
  },
  mutations: {
    [LOGIN](state) {
      state.isLoggedIn = true
    },
    [LOGOUT](state) {
      state.isLoggedIn = false
    }
  },
  actions: {}
})
