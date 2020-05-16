<script>
import Transaction from './Transaction.vue'
export default {
  extends: Transaction,
  data () {
    return {
      fields: this.$table.fields.transaction.recive,
      idTable: 'table-recive-money',
      items: [{}]
    }
  },
  methods: {
    fetchDataRecive (searchText, page, size) {
      return this.getHistoryTransaction(searchText, this.paymentMethod.deposit, this.filter30Days.startDate, this.filter30Days.endDate, page, size)
        .then(res => {
          let data = res.data.content
          if (data.length === 0) { data = [{}] }
          this.$set(this, 'items', data)
          // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$set(this, 'items', [])
        })
    },

    fetchDataReciveForAdmin (search, page, size) {
      return this.getCrossCheck(search.bankId, this.paymentMethod.deposit, search.startDate, search.endDate, page, size)
        .then(res => {
          let data = res.data.content
          if (data.length === 0) { data = [{}] }
          this.$set(this, 'items', data)
          // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$set(this, 'items', [])
        })
    }
  }
}
</script>
