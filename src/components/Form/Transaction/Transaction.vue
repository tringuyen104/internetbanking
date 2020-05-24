<template>
  <div>
    <b-table :id="idTable" :items="items" :fields="fields" striped responsive="sm" :perPage="perPage" :current-page="currentPage">
      <template v-slot:cell(createdDate)="data">
        <span>{{ $helper.formatDatetime(data.item.createdDate) }}</span>
      </template>
      <template v-slot:cell(amount)="data">
        <span>{{ $helper.formatCurrency(data.item.amount) }}</span>
      </template>
    </b-table>
     <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :aria-controls="idTable"
    ></b-pagination>
  </div>
</template>

<script>
import AccountApi from '../../../mixins/Account/AccountApi'
import { define } from '../../../common/define'
export default {
  mixins: [AccountApi],
  data () {
    return {
      items: [],
      fields: [],
      perPage: 5,
      currentPage: 1,
      idTable: 'transaction-table',
      filter30Days: {
        startDate: this.$moment(new Date()).add(-30, 'days').format(define.formatTimeZoneLocal), // this.$moment(new Date(), define.formatDate, true).add(-30, 'days').format(),
        endDate: this.$moment(new Date()).format(define.formatTimeZoneLocal)// this.$moment(new Date(), define.formatDate, true).format()
      },
      paymentMethod: define.method

    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  }
}
</script>
