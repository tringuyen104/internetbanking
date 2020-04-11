<template>
  <div>
    <!-- <OTP :transfersData="infoModal" :idPopup="idOTPPopup"  @submitOtp="submit"/> -->
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <template v-if="row.item.id">
          <!-- <i
            class="fas fa-check fa-lg green-color"
            @click="transfers(row.item, row.index, $event.target)"
            :title="$t('payment')"
          ></i> -->
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
    <confirm ref="modalConfirm" :id="debtId" :idPopup="idRemovePopup" />
  </div>
</template>

<script>
import Confirm from '../Popup/ConfirmRemoveDebt.vue'
import DebtApi from '../../mixins/Debt/DebtApi'

export default {
  mixins: [DebtApi],
  components: {
    Confirm
  },
  // extends: Confirm,
  data () {
    return {
      infoModal: {},
      context: '',
      debtId: 0,
      idRemovePopup: 'removeDebtReminder',
      fields: this.$table.fields.debtReminder,
      items: [{}]
    }
  },
  created () {
    this.getPlaylistDebt()
  },
  methods: {
    remove (item, index, button) {
      this.$set(this, 'debtId', item.id)
      this.$bvModal.show(this.idRemovePopup)
    },
    submit (value) {
      return value
    },
    getPlaylistDebt () {
      return this.fetchPlaylistDebt().then(res => {
        let data = this.mapData(res.data)
        console.log(data)
        this.$set(this, 'items', data)
      })
    },
    mapData (data) {
      if (!data || data.length === 0) { return [{}] }
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
