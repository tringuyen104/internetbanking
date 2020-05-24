<template>
  <form class="form-label cross-check">
    <h2 class="form-title">{{ $t('crossCheck') }}</h2>
    <div class="margin-auto">
      <div class="row">
        <div class="col-md-3">
          <label for="inputEmail4">{{ $t('fromdate') }}</label>
          <date-picker
            v-model="searchModel.startDate"
            :config="options"
            v-validate="'required'"
            :name="'startDate'"
          ></date-picker>
        </div>
        <div class="col-md-3">
          <label for="inputEmail4">{{ $t('todate') }}</label>
          <date-picker
            v-model="searchModel.endDate"
            :config="options"
            v-validate="'required'"
            :name="'endDate'"
          ></date-picker>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="account">{{ $t('bank') }}</label>
            <select
              class="form-control"
              id="bank"
              v-model="searchModel.bankId"
              v-validate="'required'"
              name="bank"
            >
              <option v-for="bank in banks" :key="bank.id" :value="bank.id">{{bank.bankName}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-2 search-button">
          <label for="search">{{$t('search')}}</label>
          <button
            type="button"
            class="btn btn-primary"
            id="search"
            @click="search"
          >{{$t('search')}}</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <form-field-error :validation-errors="errors" :field="'startDate'" />
        </div>
        <div class="col-md-3">
          <form-field-error :validation-errors="errors" :field="'endDate'" />
        </div>
        <div class="col-md-4">
          <form-field-error :validation-errors="errors" :field="'bank'" />
        </div>
      </div>
      <br />
      <transaction-management :searchValue="crossCheckModel" ref="transactionManager"/>
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
    getBanksAssociated () {
      this.fetchBankAssociated().then(
        res => {
          let result = [{ id: 'all', bankName: this.$t('allbank') }]
          let data = Object.assign([], res.data)
          result = result.concat(data)
          this.$set(this, 'banks', result)
        },
        // eslint-disable-next-line handle-callback-err
        err => {
          this.$set(this, 'banks', [])
        }
      )
    },

    parseSearchModel () {
      let obj = Object.assign({}, this.searchModel)
      let bankId = obj.bankId
      if (bankId === 'all') { obj.bankId = '' }
      return obj
    },

    search () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$set(this, 'crossCheckModel', this.parseSearchModel())
        }
      })
    }
  }
}
</script>
<style lang="scss">
.cross-check {
  .search-button {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    label {
      color: aliceblue;
    }
  }
}
</style>
