<template>
  <div class="col-lg-6 col-md-12 col-sm-12 margin-auto">
    <div class="row">
      <div class="col-md-6">
        <date-picker v-model="date" :config="options"></date-picker>
      </div>
      <div class="col-md-6">
        <date-picker v-model="date" :config="options"></date-picker>
      </div>
    </div>
    <div class="row"></div>
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
    <h6 class="red-color d-flex">{{ $t('last30DaysTransaction') }}</h6>
  </div>
</template>
<script>
import ReciveMoney from '../Transaction/ReciveMoney.vue'
import TransfersMoney from '../Transaction/TransfersMoney.vue'
import PaymentDebtReminder from '../Transaction/PaymentDebtReminder.vue'
import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  data () {
    return {
      date: new Date(),
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false
      }
    }
  },
  components: {
    ReciveMoney,
    TransfersMoney,
    PaymentDebtReminder,
    datePicker
  }
};
</script>
