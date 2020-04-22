<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('crossCheck') }}</h2>
    <div class="margin-auto">
    <div class="row">
      <div class="col-md-3">
        <label for="inputEmail4">{{ $t('fromdate') }}</label>
        <date-picker v-model="searchModel.startDate" :config="options"></date-picker>
      </div>
      <div class="col-md-3">
        <label for="inputEmail4">{{ $t('todate') }}</label>
        <date-picker v-model="searchModel.endDate" :config="options"></date-picker>
      </div>
      <div class="col-md-4">
        <div class="form-group">
        <label for="account">{{ $t('bank') }}</label>
        <select class="form-control" id="bank" v-model="searchModel.bankId">
           <option v-for="bank in banks" :key="bank.id" :value="bank.id"> {{bank.bankName}} </option>
        </select>
      </div>
      </div>
      <div class="col-md-2 submitbtn">
        <button type="submit" class="btn btn-primary" @click.prevent="search">Submit</button>
      </div>
    </div>
    <br/>
    <transaction-management :searchValue="crossCheckModel"/>
  </div>
 </form>
</template>
<script>
import TransactionManagement from '../Form/Transaction/TransactionManagement.vue'
import BankApi from '../../mixins/Bank/BankApi'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import { define } from '../../common/define'

export default {
  mixins: [BankApi],
  data () {
    return {
      fromDate: new Date(),
      toDate: new Date(),
      banks: [],
      options: {
        format: define.formatDate,
        useCurrent: false
      },
      searchModel: {
        bankId: '',
        startDate: new Date(),
        endDate: new Date()
      },
      crossCheckModel: {}
    }
  },
  components: {
    TransactionManagement,
    datePicker
  },
  created () {
    this.getBanksAssociated()
  },
  methods: {
    exchangeHistory () {
      return ''
    },

    getBanksAssociated () {
      this.fetchBankAssociated().then(res => {
        let result = [{ id: 'all', bankName: this.$t('allbank') }]
        let data = Object.assign([], res.data)
        result = result.concat(data)
        this.$set(this, 'banks', result)
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$set(this, 'banks', [])
      })
    },

    search () {
      this.$set(this, 'crossCheckModel', this.searchModel)
    }
  }
}
</script>
<style lang="scss">
.submitbtn {
  padding-top: 4%;
}
</style>
