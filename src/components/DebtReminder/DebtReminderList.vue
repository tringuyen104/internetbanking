<template>
  <div>
    <!-- <OTP :transfersData="infoModal" :idPopup="idOTPPopup"  @submitOtp="submit"/> -->
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(action)="row">
        <template v-if="row.item.id">
          <i
            class="fas fa-times fa-lg red-color margin-icon point-action"
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
    <confirm ref="modalConfirm" :id="debtId" :idPopup="idRemovePopup" @remove="remove"/>
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
  methods: {
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
    getPlaylistDebt () {
      return this.fetchPlaylistDebt().then(res => {
        let data = this.mapData(res.data)
        this.$set(this, 'items', data)
        console.log(data)
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
  }
}
</script>
