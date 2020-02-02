<template>
  <div class="col-lg-6 col-md-12 col-sm-12 margin-auto">
    <b-tabs content-class="mt-3">
      <b-tab :title="$t('reciveMoney')" active><recive-money/></b-tab>
      <b-tab :title="$t('transfersMoney')"><transfers-money/></b-tab>
      <b-tab :title="$t('paymentDebtReminder')"><payment-debt-reminder /></b-tab>
    </b-tabs>
    <h6 class="red-color d-flex">{{ $t('last30DaysTransaction') }}</h6>
  </div>
</template>
<script>
import ReciveMoney from '../Transaction/ReciveMoney.vue'
import TransfersMoney from '../Transaction/TransfersMoney.vue'
import PaymentDebtReminder from '../Transaction/PaymentDebtReminder.vue'

export default {
  components: {
    ReciveMoney,
    TransfersMoney,
    PaymentDebtReminder
  }
}
</script>
