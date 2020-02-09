<template>
  <b-tabs content-class="mt-3">
    <b-tab :title="$t('reciveMoney')" active>
      <recive-money />
    </b-tab>
    <b-tab :title="$t('transfersMoney')">
      <transfers-money />
    </b-tab>
    <b-tab :title="$t('paymentDebtReminder')">
      <payment-debt-reminder />
    </b-tab>
  </b-tabs>
</template>
<script>
import PaymentDebtReminder from './PaymentDebtReminder.vue'
import ReciveMoney from './ReciveMoney.vue'
import TransfersMoney from './TransfersMoney.vue'

export default {
  components: {
    ReciveMoney,
    TransfersMoney,
    PaymentDebtReminder
  },
  methods: {
    exchangeHistory () {
      return ''
    }
  }
}
</script>
<style lang="scss">
.submitbtn {
  padding-top: 4%;
}
</style>
