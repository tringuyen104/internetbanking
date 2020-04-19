<template>
  <div>
     <loading
      :active.sync="isLoading"
      :is-full-page="true"
    ></loading>
     <b-tabs content-class="mt-3" v-model="tabIndex">
    <b-tab :title="$t('reciveMoney')" active>
      <recive-money :ref="ref.recive"/>
    </b-tab>
    <b-tab :title="$t('transfersMoney')">
      <transfers-money :ref="ref.transfers"/>
    </b-tab>
    <b-tab :title="$t('paymentDebtReminder')">
      <payment-debt-reminder :ref="ref.payment"/>
    </b-tab>
  </b-tabs>
  </div>
</template>
<script>
import PaymentDebtReminder from './PaymentDebtReminder.vue'
import ReciveMoney from './ReciveMoney.vue'
import TransfersMoney from './TransfersMoney.vue'
// bên này phải hander trường hợp 2 component sẽ call chung cái component này
export default {
  props: {
    searchValue: null
  },
  components: {
    ReciveMoney,
    TransfersMoney,
    PaymentDebtReminder
  },
  data () {
    return {
      tabIndex: 0,
      isLoading: false,
      ref: {
        recive: 'reciveRef',
        transfers: 'transfersRef',
        payment: 'paymentRef'
      }
    }
  },
  methods: {
    exchangeHistory () {
      console.log(this.searchValue)
      if (!this.searchValue || this.searchValue === '') { return }
      // role employee
      if (this.role === 'staff' && this.role !== 'user') {
        this.$helper.callOneTimes(this.fetchDataForEmployee, 1000)
      }
      // role admin
      if (this.role !== 'staff' && this.role !== 'user') {
        this.isLoading = false
        this.$helper.callOneTimes(this.fetchDataForAdmin, 1000)
      }
    },

    fetchDataForEmployee () {
      this.isLoading = true
      switch (this.tabIndex) {
        case 0: // recive money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.recive].fetchDataRecive(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 1: // transfer money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.transfers].fetchDataTransfer(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 2: // payment
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.payment].fetchDataPayment(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
      }
    },

    fetchDataForAdmin () {
      this.isLoading = true
      switch (this.tabIndex) {
        case 0: // recive money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.recive].fetchDataReciveForAdmin(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 1: // transfer money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.transfers].fetchDataTransferForAdmin(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 2: // payment
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.payment].fetchDataPaymentForAdmin(this.searchValue).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
      }
    }
  },
  watch: {
    searchValue (val, oldVal) { this.exchangeHistory() },
    tabIndex (val, oldVal) { this.exchangeHistory() }
  },
  computed: {
    role () {
      return atob(this.$store.state.user.r).toLowerCase()
    }
  }
}
</script>
