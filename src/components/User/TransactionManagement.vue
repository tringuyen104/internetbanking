<template>
  <div class="col-lg-8 col-md-12 col-sm-12 margin-auto transaction-management">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
    ></loading>
    <div class="title flex">
      <h2>{{$t('transactionHistory')}}</h2>
    </div>
    <br>
    <div class="form-group">
        <!-- <label for="account">{{ $t("accountDestination") }}</label> -->
        <v-select
          :class="'hide-clear'"
          :clearable="false"
          :placeholder="$t('notification.choiceAccountNumber')"
          :options="cards.map(item => { return item.accountId})"
          v-model="accountId"
          @input="changeAcccount"
        ></v-select>
    </div>
    <b-tabs content-class="mt-3" class="transaction-management-result"  v-model="tabIndex">
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
import ReciveMoney from '../Transaction/ReciveMoney.vue'
import TransfersMoney from '../Transaction/TransfersMoney.vue'
import PaymentDebtReminder from '../Transaction/PaymentDebtReminder.vue'
import UserApi from '../.././mixins/User/UserApi'

export default {
  mixins: [UserApi],
  components: {
    ReciveMoney,
    TransfersMoney,
    PaymentDebtReminder
  },
  data () {
    return {
      accountId: '',
      isLoading: false,
      tabIndex: 0,
      cards: [],
      ref: {
        recive: 'reciveRef',
        transfers: 'transfersRef',
        payment: 'paymentRef'
      }
    }
  },
  created () {
    this.getCards()
  },
  methods: {
    getCards () {
      this.getListCard().then(response => {
        this.$set(this, 'cards', response.data)
        // this.$set(this, 'accountId', response.data[0].accountId)
      })
    },
    changeAcccount (value) {
      this.$set(this, 'accountId', value)
      this.getTransactionHistories()
    },
    getTransactionHistories () {
      this.$helper.callOneTimes(this.fetchData, 1000)
    },
    fetchData () {
      this.isLoading = true
      switch (this.tabIndex) {
        case 0: // recive money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.recive].fetchDataRecive(this.accountId).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 1: // transfer money
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.transfers].fetchDataTransfer(this.accountId).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 2: // payment
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.payment].fetchDataPayment(this.accountId).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
      }
    }
  },
  watch: {
    tabIndex (val, oldVal) { this.getTransactionHistories() }
  }
}
</script>
<style lang="scss">
.transaction-management {
  .transaction-management-result {
    margin-top: 2em;
  }
}
</style>
