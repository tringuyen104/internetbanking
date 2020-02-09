<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('transaction') }}</h2>
    <div class="margin-auto">
    <div class="row">
      <div class="col-md-4">
        <label for="inputEmail4">{{ $t('fromdate') }}</label>
        <date-picker v-model="fromDate" :config="options"></date-picker>
      </div>
      <div class="col-md-4">
        <label for="inputEmail4">{{ $t('todate') }}</label>
        <date-picker v-model="toDate" :config="options"></date-picker>
      </div>
      <div class="col-md-2">
        <div class="input-group">
          <b-nav-item-dropdown :text="$t('bank')" right>
          <b-dropdown-item>{{ $t('allbank') }}</b-dropdown-item>
          <b-dropdown-item>{{ $t('bank1') }}</b-dropdown-item>
          <b-dropdown-item>{{ $t('bank2') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </div>
      <div class="col-md-2 submitbtn">
        <div class="float-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
    <br/>
    <b-tabs content-class="mt-3">
      <b-tab :title="$t('reciveMoney')" active>
        <recive-money />
      </b-tab>
      <!-- <b-tab :title="$t('transfersMoney')">
        <transfers-money />
      </b-tab>
      <b-tab :title="$t('paymentDebtReminder')">
        <payment-debt-reminder />
      </b-tab> -->
    </b-tabs>
    <h6 class="red-color d-flex">{{ $t('last30DaysTransaction') }}</h6>
  </div>
 </form>
</template>
<script>
// import PaymentDebtReminder from '../Form/Transaction/PaymentDebtReminder.vue'
import ReciveMoney from '../Form/Transaction/ReciveMoney.vue'
// import TransfersMoney from '../Form/Transaction/TransfersMoney.vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  data () {
    return {
      fromDate: new Date(),
      toDate: new Date(),
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false
      }
    }
  },
  components: {
    ReciveMoney,
    // TransfersMoney,
    // PaymentDebtReminder,
    datePicker
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
