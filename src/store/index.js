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
    isLogin: bcrypt.compareSync('isLogin', (localStorage.getItem('login') ? localStorage.getItem('login') : '')),
    user: localStorage.getItem('user') ? localStorage.getItem('user') : ''
  },
  mutations: {
    updateLogin (state, data) {
      state.isLogin = data
    },
    updateUser (state, data) {
      state.user = data
    }
  }
}

const Account = {
  namespace: true,
  state: {
    type: {
      'SAVING': 'Tiết kiệm',
      'PAYMENT': 'Thanh toán'
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
