import Vue from 'vue'
import Vuex from 'vuex'
import bcrypt from 'bcryptjs'
Vue.use(Vuex)

const user = {
  namespace: true,
  state: {
    r: localStorage.getItem('r'),
    isLogin: bcrypt.compareSync('isLogin', (localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : '')),
    userName: localStorage.getItem('user')
  },
  mutations: {
    updateLogin (state, value) {
      state.isLogin = value
    },
    updateR (state, value) {
      state.r = value
    },
    updateUsername (state, userName) {
      state.userName = userName
    }
  }
}

export default new Vuex.Store({
  modules: {
    user
  }
})
