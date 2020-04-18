import Vue from 'vue'
import Vuex from 'vuex'
import bcrypt from 'bcryptjs'
Vue.use(Vuex)

const user = {
  namespace: true,
  state: {
    r: sessionStorage.getItem('r'),
    isLogin: bcrypt.compareSync('isLogin', (sessionStorage.getItem('currentUser') ? sessionStorage.getItem('currentUser') : '')),
    userName: sessionStorage.getItem('user')
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
