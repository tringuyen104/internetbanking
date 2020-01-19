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

export const store = new Vuex.Store({
  modules: {
    'debtReminder': DebtReminder
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
