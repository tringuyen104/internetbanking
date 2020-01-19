<template>
  <div class="col-lg-6 col-md-12 col-sm-12 margin-auto">
    <b-tabs content-class="mt-3">
      <b-tab :title="$t('debtReminderUnpay')" active><unpay/></b-tab>
      <b-tab :title="$t('lstDebtReminder')"><debt-reminder-list/></b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Unpay from './DebtReminderUnPay.vue'
import DebtReminderList from './DebtReminderList.vue'

export default {
  components: {
    Unpay,
    DebtReminderList
  }
}
</script>
