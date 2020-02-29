<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('transaction') }}</h2>
    <div class="margin-auto">
      <div class="row">
        <div class="col-md-3">
          <label for="inputEmail4">{{ $t('fromdate') }}</label>
          <date-picker v-model="fromDate" :config="options"></date-picker>
        </div>
        <div class="col-md-3">
          <label for="inputEmail4">{{ $t('todate') }}</label>
          <date-picker v-model="toDate" :config="options"></date-picker>
        </div>
        <div class="form-group col-md-4">
          <label for="inputAddress">{{ $t('accNumber') }}</label>
          <input type="text" class="form-control" id="accNumber" />
        </div>
        <div class="col-md-2 submitbtn">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
      <br/>
      <transaction-management />
      <!-- <h6 class="red-color d-flex">{{ $t('last30DaysTransaction') }}</h6> -->
    </div>
  </form>
</template>
<script>
import TransactionManagement from '../Form/Transaction/TransactionManagement.vue'
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
    TransactionManagement,
    datePicker
  },
  methods: {
    exchangeHistory () {
      return ''
    }
  }
}
</script>
