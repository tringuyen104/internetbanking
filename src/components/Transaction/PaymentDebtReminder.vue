<script>
import Transaction from '../Form/Transaction.vue'
export default {
  extends: Transaction,
  data () {
    return {
      fields: this.$table.fields.transaction.forward,
      idTable: 'table-payment-debt-reminder',
      items: [{}]
    }
  },
  methods: {
    fetchDataPayment (searchText, page, size) {
      console.log('payment')
      return this.getHistoryTransaction(searchText, this.paymentMethod.payment, this.filter30Days.startDate, this.filter30Days.endDate, page, size)
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
