<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('crossCheck') }}</h2>
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
      <div class="col-md-4">
        <!-- <div class="input-group">
          <b-nav-item-dropdown :text="$t('bank')" right>
          <b-dropdown-item>{{ $t('allbank') }}</b-dropdown-item>
          <b-dropdown-item>{{ $t('bank1') }}</b-dropdown-item>
          <b-dropdown-item>{{ $t('bank2') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </div> -->
        <div class="form-group">
        <label for="account">{{ $t('bank') }}</label>
        <select class="form-control" id="bank">
          <option>{{ $t('allbank') }}</option>
          <option>{{ $t('bank1') }}</option>
          <option>{{ $t('bank2') }}</option>
        </select>
      </div>
      </div>
      <div class="col-md-2 submitbtn">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <br/>
    <transaction-management />
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
<style lang="scss">
.submitbtn {
  padding-top: 4%;
}
</style>
