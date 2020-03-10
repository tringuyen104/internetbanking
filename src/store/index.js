import Vue from 'vue'
import Vuex from 'vuex'
import bcrypt from 'bcryptjs'
Vue.use(Vuex)

const user = {
  namespace: true,
  state: {
    r: sessionStorage.getItem('r'),
    isLogin: bcrypt.compareSync('isLogin', (sessionStorage.getItem('currentUser') ? sessionStorage.getItem('currentUser') : ''))
  },
  mutations: {
    updateLogin (state, value) {
      state.isLogin = value
    },
    updateR (state, value) {
      state.r = value
    }
  }
}

export default new Vuex.Store({
  modules: {
    user
  }
})
