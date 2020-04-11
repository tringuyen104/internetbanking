import Vue from 'vue'
import Vuex from 'vuex'
import bcrypt from 'bcryptjs'

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
    isLogin: bcrypt.compareSync('isLogin', (localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : '')),
    currentUser: {}
  },
  mutations: {
    updateCurrentUser (state, data) {
      state.currentUser = data
    },
    updateLogin (state, data) {
      state.isLogin = data
    }
  }
}

const Account = {
  namespace: true,
  state: {
    type: {
      'SAVING': 'Tiết kiệm',
      'Payment': 'Thanh toán'
    }
  }
}

export const store = new Vuex.Store({
  modules: {
    'debtReminder': DebtReminder,
    'login': Login,
    'account': Account
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
