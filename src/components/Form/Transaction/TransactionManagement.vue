<template>
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
</template>
<script>
import PaymentDebtReminder from './PaymentDebtReminder.vue'
import ReciveMoney from './ReciveMoney.vue'
import TransfersMoney from './TransfersMoney.vue'

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
      ref: {
        recive: 'reciveRef',
        transfers: 'transfersRef',
        payment: 'paymentRef'
      }
    }
  },
  methods: {
    exchangeHistory () {
      this.$helper.callOneTimes(this.fetchData, 1000)
    },
    fetchData () {
      switch (this.tabIndex) {
        case 0: // recive money
          this.$refs[this.ref.recive].fetchDataRecive(this.searchValue)
          break
        case 1: // transfer money
          this.$refs[this.ref.transfers].fetchDataTransfer(this.searchValue)
          break
        case 2: // payment
          this.$refs[this.ref.payment].fetchDataPayment(this.searchValue)
          break
      }
    }
  },
  watch: {
    searchValue (val, oldVal) { this.exchangeHistory() },
    tabIndex (val, oldVal) { this.exchangeHistory() }
  }
}
</script>
