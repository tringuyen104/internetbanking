<template>
  <div>
    <confirm ref="modalConfirm" :id="debtId" />
    <OTP :transfersData="infoModal" :idPopup="idOTPPopup" />
    <b-table :items="data" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <i
          class="fas fa-check fa-lg green-color"
          @click="transfers(row.item, row.index, $event.target)"
          :title="$t('payment')"
        ></i>
        <i
          class="fas fa-times fa-lg red-color margin-left-05em"
          @click="remove(row.item, row.index, $event.target)"
          :title="$t('removeDebt')"
        ></i>
      </template>
      <template v-slot:cell(created)="data">
          <span>{{ $moment(data.item.created).format('MM/DD/YYYY') }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import OTP from '../Popup/OTP.vue'
export default {
  components: {
    Confirm,
    OTP: OTP
  },
  // extends: Confirm,
  data () {
    return {
      infoModal: {},
      context: '',
      debtId: 0,
      idOTPPopup: 'modal-otp-lst',
      fields: this.$table.fields.debtReminder,
      items: [
        {
          isActive: true,
          age: 40,
          id: 1,
          creator: 'Dickerson',
          money: '12.000.000',
          created: new Date()
        },
        {
          isActive: false,
          age: 21,
          creator: 'Larsen',
          money: '123123',
          created: new Date()
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
          money: '12,224,444.00',
          created: new Date()
        }
      ]
    }
  },
  methods: {
    remove (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      // this.$refs.modalConfirm.show()
      this.$bvModal.show('modal-confirm')
      console.log('run')
    },
    transfers (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      // this.$refs.modalConfirm.show()
      this.$bvModal.show(this.idOTPPopup)
      console.log('run')
    },
    resetInfoModal () {
      return ''
    }
  },
  computed: {
    data () {
      return this.$store.state.debtReminder.lstDebtData
    }
  },
  created () {
    this.$store.commit('updateLstDebtData', this.items)
  }
//   ,
//   watch: {
//     data () {
//       console.log(this.data)
//     }
//   }
}
</script>
