<template>
  <div>
    <!-- <confirm ref="modalConfirm" :id="debtId"/> -->
    <OTP :transfersData="infoModal" :idPopup="idOTPPopup" />
    <b-table :items="data" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <i
          class="fas fa-check fa-lg green-color"
          @click="transfers(row.item, row.index, $event.target)"
          :title="$t('payment')"
        ></i>
      </template>
      <template v-slot:cell(created)="data">
        <span>{{ $moment(data.item.created).format("MM/DD/YYYY") }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
// import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import OTP from '../Popup/OTP.vue'
export default {
  components: {
    OTP: OTP
  },
  // extends: Confirm,
  data () {
    return {
      infoModal: {},
      context: '',
      debtId: 0,
      idOTPPopup: 'modal-otp-unpay',
      fields: this.$table.fields.debtReminder,
      items: [
        {
          isActive: true,
          age: 40,
          id: 1,
          creator: 'Dickerson',
          created: new Date(),
          money: '12.000.000'
        },
        {
          isActive: false,
          age: 21,
          creator: 'Larsen',
          created: new Date(),
          money: '123123'
        },
        {
          isActive: false,
          age: 89,
          creator: 'Geneva',
          money: '12,000,000.00',
          created: new Date(),
          _showDetails: true
        },
        {
          isActive: true,
          age: 38,
          creator: 'Jami',
          created: new Date(),
          money: '12,224,444.00'
        }
      ]
    }
  },
  computed: {
    data () {
      return this.$store.state.debtReminder.unPayData
    }
  },
  methods: {
    transfers (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal = item // JSON.stringify(item, null, 2)
      this.infoModal.unPay = true
      // this.$refs.modalConfirm.show()
      // this.$bvModal.show('modal-confirm')
      this.$bvModal.show(this.idOTPPopup)
      console.log('run')
    },
    resetInfoModal () {
      return ''
    }
  },
  created () {
    this.$store.commit('updateUnpayData', this.items)
  }
}
</script>
