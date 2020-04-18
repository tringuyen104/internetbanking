<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <template v-if="row.item.id">
          <i
            class="fas fa-check fa-lg green-color"
            @click="confirmPayment(row.item, row.index, $event.target)"
            :title="$t('payment')"
          ></i>
          <i
            class="fas fa-times fa-lg red-color margin-left-05em"
            @click="confirmRemove(row.item, row.index, $event.target)"
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
    <payment-confirm :item="infoPayment" :idPopup="paymentPopupId" @payment="payment"/>
    <confirm ref="modalConfirm" :id="debtId" :idPopup="idRemovePopup" @remove="remove"/>
    <OTP :transfersData="infoModal" :idPopup="idOTPPopup" @submitOtp="submit"/>
  </div>
</template>

<script>
// import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import OTP from '../Popup/OTP.vue'
import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import PaymentConfirm from '../Popup/PaymentConfirm'
import DebtApi from '../../mixins/Debt/DebtApi'
import UserApi from '../.././mixins/User/UserApi'
export default {
  mixins: [DebtApi, UserApi],
  components: {
    OTP: OTP,
    PaymentConfirm,
    Confirm
  },
  // extends: Confirm,
  data () {
    return {
      infoModal: {},
      paymentPopupId: 'payment-id-popup',
      context: '',
      debtId: 0,
      infoPayment: {},
      confirmationId: '',
      idOTPPopup: 'modal-otp-unpay',
      idRemovePopup: 'modal-remove-debt',
      fields: this.$table.fields.debtReminder,
      items: [{}]
    }
  },
  methods: {
    confirmPayment (item, index, button) {
      this.paymentDebt(item.id).then(res => {
        // this.$helper.toast.success(this, this.$t('paymentSuccess'))
        // this.getUnpayDebtReminder()
        let fullName = `${item.userHolder.firstName} ${item.userHolder.lastName}`
        let transactionInfo = res.data.transactionInfo
        let obj = {
          fullName: fullName,
          amount: transactionInfo.amount,
          fee: transactionInfo.fee,
          content: transactionInfo.content,
          id: transactionInfo.id
        }
        this.$set(this, 'infoPayment', obj)
        this.$bvModal.show(this.paymentPopupId)
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    payment (id) {
      this.$bvModal.show(this.idOTPPopup)
    },
    submit (otpCode) {
      let obj = {
        id: this.infoPayment.id,
        otpCode: otpCode
      }
      this.confirmRequestTransaction(obj).then(res => {
        this.$helper.toast.success(this, this.$t('transfersSuccess'))
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    confirmRemove (item, index, button) {
      this.$set(this, 'debtId', item.id)
      this.$bvModal.show(this.idRemovePopup)
    },
    remove (value) {
      let obj = {
        content: value.context
      }
      this.deleteDebt(value.id, obj).then(res => {
        this.$helper.toast.success(this, this.$t('removeDebtSuccess'))
        this.getPlaylistDebt()
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    getUnpayDebtReminder () {
      return this.fetchUnpayDebt().then(res => {
        let data = this.mapData(res.data)
        this.$set(this, 'items', data)
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
