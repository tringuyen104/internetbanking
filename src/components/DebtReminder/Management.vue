<template>
  <div class="col-lg-6 col-md-12 col-sm-12 margin-auto">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
    ></loading>
    <div class="title flex">
      <h2>{{$t('debtReminderManagement')}}</h2>
    </div>
    <br>
    <b-tabs content-class="mt-3" v-model="tabIndex">
      <b-tab :title="$t('debtReminderUnpay')" active><unpay :ref="ref.unpay"/></b-tab>
      <b-tab :title="$t('lstDebtReminder')"><debt-reminder-list :ref="ref.debtReminderList"/></b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Unpay from './UnPaid.vue'
import DebtReminderList from './PlayList.vue'

export default {
  components: {
    Unpay,
    DebtReminderList
  },
  data () {
    return {
      tabIndex: 0,
      isLoading: false,
      ref: {
        unpay: 'unpayDebtReminder',
        debtReminderList: 'debtReminderList'
      }
    }
  },
  methods: {
    fetchData () {
      this.isLoading = true
      switch (this.tabIndex) {
        case 0: // unpay debt
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.unpay].getUnpayDebtReminder().then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
        case 1: // playlist debt
          // eslint-disable-next-line handle-callback-err
          this.$refs[this.ref.debtReminderList].getPlaylistDebt(this.accountId).then(res => { this.isLoading = false }, err => { this.isLoading = false })
          break
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    tabIndex () {
      this.fetchData()
    }
  }
}
</script>
