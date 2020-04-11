<template>
  <div>
    <!-- <confirm ref="modalConfirm" :id="debtId"/> -->
    <OTP :transfersData="infoModal" :idPopup="idOTPPopup" @submitOtp="submit"/>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <template v-if="row.item.id">
          <i
            class="fas fa-check fa-lg green-color"
            @click="confirm(row.item, row.index, $event.target)"
            :title="$t('payment')"
          ></i>
          <i
            class="fas fa-times fa-lg red-color margin-left-05em"
            @click="remove(row.item, row.index, $event.target)"
            :title="$t('removeDebt')"
          ></i>
        </template>
      </template>
      <template  v-slot:cell(userHolder)="row">
        <template v-if="row.item.userHolder">
          <label>{{`${row.item.userHolder.firstName} ${row.item.userHolder.lastName}`}}</label>
        </template>
      </template>
      <template v-slot:cell(createDate)="data">
        <label>{{ $helper.formatDatetime(data.item.createDate) }}</label>
      </template>
      <template v-slot:cell(amount)="data">
        <label>{{ $helper.formatCurrency(data.item.amount) }}</label>
      </template>
    </b-table>
    <payment-debt :item="infoPayment" :idPopup="paymentPopupId" @payment="payment"/>
  </div>
</template>

<script>
// import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import OTP from '../Popup/OTP.vue'
import PaymentDebt from '../Popup/PaymentDebt'
import DebtApi from '../../mixins/Debt/DebtApi'
export default {
  mixins: [DebtApi],
  components: {
    OTP: OTP,
    PaymentDebt
  },
  // extends: Confirm,
  data () {
    return {
      infoModal: {},
      paymentPopupId: 'payment-id-popup',
      context: '',
      debtId: 0,
      infoPayment: {},
      idOTPPopup: 'modal-otp-unpay',
      fields: this.$table.fields.debtReminder,
      items: [{}]
    }
  },
  methods: {
    confirm (item, index, button) {
      this.$set(this, 'infoPayment', item)
      this.$bvModal.show(this.paymentPopupId)
    },
    payment (id) {
      this.paymentDebt(id).then(res => {
        this.$helper.toast.success(this, this.$t('paymentSuccess'))
        this.getUnpayDebtReminder()
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    submit (value) {
      return ''
    },
    getUnpayDebtReminder () {
      return this.fetchUnpayDebt().then(res => {
        let data = this.mapData(res.data)
        this.$set(this, 'items', data)
        console.log(data)
      })
    },
    mapData (data) {
      if (data.length === 0) {
        return [{}]
      }
      let copyData = Object.assign([], data)
      return copyData.map(item => {
        if (!item.userHolder.firstName) {
          item.userHolder.firstName = ''
        }
        if (!item.userHolder.lastName) {
          item.userHolder.lastName = ''
        }
        return item
      })
    }
  }
}
</script>
