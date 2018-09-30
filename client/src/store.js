import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
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
      state.pending = true
    },
    [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT](state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  }
})
