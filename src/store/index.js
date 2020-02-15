import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const DebtReminder = {
  namespace: true,
  state: {
    unPayData: [],
    lstDebtData: []
  },
  mutations: {
    updateUnpayData (state, data) {
      state.unPayData = data
    },
    updateLstDebtData (state, data) {
      state.lstDebtData = data
    }
  }
}

const Login = {
  namespace: true,
  state: {
    isLogin: false,
    currentUser: {}
  },
  mutations: {
    updateCurrentUser (state, data) {
      state.currentUser = data
    },
    updateIsLogin (state, data) {
      state.isLogin = data
    }
  }
}

export const store = new Vuex.Store({
  modules: {
    'debtReminder': DebtReminder,
    'login': Login
  }
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
