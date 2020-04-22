<script>
import Transaction from './Transaction.vue'
export default {
  extends: Transaction,
  data () {
    return {
      fields: this.$table.fields.transaction.payment,
      idTable: 'table-payment-debt-reminder',
      items: [{}]
    }
  },
  created () {
    this.$set(this, 'items', this.$helper.sortAsc(this.items, 'created'))
  },
  methods: {
    fetchDataPayment (searchText, page, size) {
      return this.getHistoryTransaction(searchText, this.paymentMethod.payment, this.filter30Days.startDate, this.filter30Days.endDate, page, size)
        .then(res => {
          let data = res.data.content
          if (data.length === 0) { data = [{}] }
          this.$set(this, 'items', data)
        // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$set(this, 'items', [{}])
        })
    },

    fetchDataPaymentForAdmin (search, page, size) {
      return this.getCrossCheck(search.bankId, this.paymentMethod.payment, search.startDate, search.endDate, page, size)
        .then(res => {
          let data = res.data.content
          if (data.length === 0) { data = [{}] }
          this.$set(this, 'items', data)
        // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$set(this, 'items', [{}])
        })
    }
  }
}
</script>
